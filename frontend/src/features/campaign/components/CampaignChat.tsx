"use client";

import { CheckCircle2, LoaderCircle, Pin } from "lucide-react";
import Link from "next/link";

import type { CampaignChat as CampaignChatType } from "../types";
import { usePinnedCampaign } from "../hooks/usePinnedCampaign";
import { CampaignChatActionsMenu } from "./CampaignChatActionsMenu";
import { cn } from "@/lib/utils";

type CampaignChatProps = CampaignChatType & {
  id: string | number;
  name: string;
  isActive?: boolean;
};

export function CampaignChat({
  id,
  name,
  status,
  isActive = false,
}: CampaignChatProps) {
  const campaignId = String(id);

  const { isPinned, togglePin } = usePinnedCampaign(campaignId);

  const isCompleted = status === "completed";
  const StatusIcon = isCompleted ? CheckCircle2 : LoaderCircle;
  const statusLabel = isCompleted ? "Completed" : "In progress";

  return (
    <div
      className={cn(
        "relative flex items-center justify-between gap-2 rounded-md border p-2 text-xs transition-colors",
        isActive
          ? "border-foreground/50 shadow-xs"
          : "border-foreground/20 hover:border-foreground/40 hover:bg-background/70",
      )}
    >
      {isActive && (
        <span className="absolute bottom-2 left-0 top-2 w-1 rounded-r-full bg-foreground" />
      )}

      <Link
        href={`/ai-campaign-builder/${campaignId}`}
        aria-current={isActive ? "page" : undefined}
        className="flex min-w-0 flex-1 items-center gap-2 pl-1"
      >
        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-md",
            isCompleted
              ? "bg-green-50 text-green-600"
              : "bg-blue-50 text-blue-600",
          )}
        >
          <StatusIcon className="size-4" />
        </span>

        <div className="min-w-0">
          <h2
            className={cn(
              "line-clamp-1 font-medium",
              isActive && "text-foreground",
            )}
          >
            {name}
          </h2>

          <div className="mt-1 flex items-center gap-1.5">
            <span
              className={cn(
                "inline-flex h-5 items-center rounded-full px-2 text-[11px] font-medium",
                isCompleted
                  ? "bg-green-50 text-green-700"
                  : "bg-blue-50 text-blue-700",
              )}
            >
              {statusLabel}
            </span>

            {isPinned && (
              <Pin className="size-3 text-muted-foreground" />
            )}
          </div>
        </div>
      </Link>

      <CampaignChatActionsMenu
        campaignId={campaignId}
        isPinned={isPinned}
        onTogglePin={togglePin}
        title={name}
        className="size-7 shrink-0 p-0"
      />
    </div>
  );
}