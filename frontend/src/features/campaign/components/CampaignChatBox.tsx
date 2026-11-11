
"use client";

import { useRef, useState } from "react";
import { ArrowUp, LoaderCircle } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

import {
  sendCampaignMessage,
  generateCampaignResponse,
} from "@/lib/campaign-chat";

interface CampaignChatBoxProps {
  campaignId: string;
  message: string;
  setMessage: (value: string) => void;
}

export function CampaignChatBox({
  campaignId,
  message,
  setMessage,
}: CampaignChatBoxProps) {
  const [isSending, setIsSending] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();

  const canSend = message.trim().length > 0 && !isSending;

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    const content = message.trim();

    if (!content || isSending) return;

    try {
      setIsSending(true);

      await sendCampaignMessage(campaignId, content);

      setMessage("");

      // Show the user's message immediately after saving.
      await queryClient.invalidateQueries({
        queryKey: ["campaign-messages", campaignId],
      });

      await generateCampaignResponse(campaignId);

      // Retrieve the AI response and its suggestions.
      await queryClient.invalidateQueries({
        queryKey: ["campaign-messages", campaignId],
      });
    } catch (error) {
      console.error("Campaign chat error:", error);
    } finally {
      setIsSending(false);
      textareaRef.current?.focus();
    }
  }

  return (
    <div className="w-full shrink-0 border-t border-border bg-background px-3 pb-4 pt-3 sm:px-6">
      {isSending && (
        <div className="mx-auto mb-2 flex max-w-5xl items-center gap-2 text-xs text-muted-foreground">
          <LoaderCircle className="size-3.5 animate-spin" />
          Your AI strategist is working...
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="mx-auto flex max-w-5xl items-end gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm focus-within:shadow-md"
      >
        <Textarea
          ref={textareaRef}
          placeholder="Type your answer..."
          rows={1}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          disabled={isSending}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" &&
              !event.shiftKey &&
              !event.nativeEvent.isComposing
            ) {
              event.preventDefault();
              event.currentTarget.form?.requestSubmit();
            }
          }}
          className="max-h-36 min-h-12 resize-none border-0 bg-transparent px-3 py-3 text-sm leading-6 shadow-none focus-visible:ring-0"
        />

        <Button
          type="submit"
          size="icon"
          disabled={!canSend}
          className="size-10 shrink-0 rounded-xl bg-slate-900 text-white hover:bg-slate-800 disabled:bg-muted disabled:text-muted-foreground"
          aria-label="Send message"
        >
          {isSending ? (
            <LoaderCircle className="size-4 animate-spin" />
          ) : (
            <ArrowUp className="size-4" />
          )}
        </Button>
      </form>
    </div>
  );
}
