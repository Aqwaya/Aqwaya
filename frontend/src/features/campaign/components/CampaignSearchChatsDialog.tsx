"use client";

import { useMemo, useState } from "react";
import {
  CheckCircle2,
  LoaderCircle,
  Pin,
  Search,
  Sparkles,
} from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import type { CampaignChat } from "../types";

interface CampaignSearchChatsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chats: CampaignChat[];
  onSelect: (campaignId: string) => void;
}

export function CampaignSearchChatsDialog({
  open,
  onOpenChange,
  chats,
  onSelect,
}: CampaignSearchChatsDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) return chats;

    return chats.filter((chat) =>
      chat.title.toLowerCase().includes(query),
    );
  }, [chats, searchQuery]);

  const handleSelect = (campaignId: string) => {
    onOpenChange(false);
    setSearchQuery("");
    onSelect(campaignId);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className="left-0 top-0 h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-4 rounded-none p-0 sm:left-1/2 sm:top-1/2 sm:h-[520px] sm:max-h-[520px] sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl"
      >
        <DialogHeader className="border-b border-border/70 px-5 pb-4 pt-5">
          <div className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-md bg-blue-50 text-blue-700">
              <Sparkles className="size-4" />
            </span>
            <DialogTitle className="text-base">
              Search campaigns
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="px-5">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder="Search campaign names..."
              className="h-11 rounded-lg pl-9"
              autoFocus
            />
          </div>
        </div>

        <div className="min-h-0 overflow-y-auto px-5 pb-5">
          {filteredChats.length > 0 ? (
            <div className="grid gap-2">
              {filteredChats.map((chat) => {
                const isCompleted = chat.status === "completed";
                const StatusIcon = isCompleted
                  ? CheckCircle2
                  : LoaderCircle;

                return (
                  <button
                    key={chat.id}
                    type="button"
                    onClick={() => handleSelect(chat.id)}
                    className="flex w-full items-center gap-3 rounded-lg border border-border p-3 text-left transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <span
                      className={cn(
                        "flex size-9 shrink-0 items-center justify-center rounded-md",
                        isCompleted
                          ? "bg-green-50 text-green-600"
                          : "bg-blue-50 text-blue-600",
                      )}
                    >
                      <StatusIcon className="size-4" />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span className="flex items-center gap-2">
                        <span className="truncate text-sm font-medium">
                          {chat.title}
                        </span>
                        {chat.pinned && (
                          <Pin className="size-3.5 shrink-0 text-muted-foreground" />
                        )}
                      </span>
                      <span className="mt-1 block text-xs text-muted-foreground">
                        {isCompleted ? "Completed" : "In progress"}
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-muted-foreground">
                No campaigns found.
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
