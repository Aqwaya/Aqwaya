"use client";

import { Check, Copy } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  getCampaignMessages,
  type CampaignMessage,
} from "@/lib/campaign-chat";

interface CampaignChatMessagesProps {
  campaignId: string;
  onSuggestionSelect: (value: string) => void;
}

export function CampaignChatMessages({
  campaignId,
  onSuggestionSelect,
}: CampaignChatMessagesProps) {
  const [copiedMessageId, setCopiedMessageId] = useState<string | null>(
    null,
  );

  const bottomRef = useRef<HTMLDivElement>(null);

  const {
    data: messages = [],
    isLoading,
    isError,
  } = useQuery<CampaignMessage[]>({
    queryKey: ["campaign-messages", campaignId],
    queryFn: () => getCampaignMessages(campaignId),
    enabled: Boolean(campaignId),
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages]);

  async function handleCopy(id: string, content: string) {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedMessageId(id);

      setTimeout(() => {
        setCopiedMessageId((current) =>
          current === id ? null : current,
        );
      }, 1500);
    } catch (error) {
      console.error("Failed to copy message:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Loading conversation...
        </p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-destructive">
          Failed to load campaign messages.
        </p>
      </div>
    );
  }

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center px-4">
        <p className="text-sm text-muted-foreground">
          Start a conversation with your AI campaign strategist.
        </p>
      </div>
    );
  }

  return (
    <TooltipProvider>
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 px-4 py-6 sm:px-6">
        {messages.map((message) => {
          const isUser = message.role === "USER";
          const isCopied = copiedMessageId === message.id;

          return (
            <article
              key={message.id}
              className={`flex w-full ${
                isUser ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`flex max-w-[90%] flex-col sm:max-w-[80%] ${
                  isUser ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-5 py-3 text-sm leading-7 sm:text-[15px] ${
                    isUser
                      ? "rounded-br-md bg-slate-900 text-white"
                      : "rounded-bl-md bg-slate-100 text-slate-900"
                  }`}
                >
                  <p className="whitespace-pre-wrap wrap-break-word">
                    {message.content}
                  </p>
                </div>

                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      className="mt-1.5 text-muted-foreground"
                      aria-label="Copy message"
                      onClick={() =>
                        handleCopy(message.id, message.content)
                      }
                    >
                      {isCopied ? (
                        <Check className="size-3.5" />
                      ) : (
                        <Copy className="size-3.5" />
                      )}
                    </Button>
                  </TooltipTrigger>

                  <TooltipContent>
                    {isCopied ? "Copied" : "Copy message"}
                  </TooltipContent>
                </Tooltip>

                {/* AI suggested replies */}
                {!isUser && message.suggestions?.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {message.suggestions.map((suggestion, index) => (
                      <Button
                        key={`${message.id}-${index}`}
                        type="button"
                        variant="outline"
                        size="sm"
                        className="h-auto rounded-full border-slate-200 px-4 py-2 text-sm font-normal whitespace-normal hover:border-blue-500 hover:bg-blue-50"
                        onClick={() =>
                          onSuggestionSelect(suggestion.value)
                        }
                      >
                        {suggestion.label}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}

        <div ref={bottomRef} />
      </div>
    </TooltipProvider>
  );
}
