
"use client";

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { PenBoxIcon } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCampaign } from "../hooks/useCampaign";

import { usePinnedCampaign } from "../hooks/usePinnedCampaign";
import { CampaignChatActionsMenu } from "./CampaignChatActionsMenu";
import { CampaignChatHeaderDetails } from "./CampaignChatHeaderDetails";

export function CampaignChatHeader() {
  const { id: campaignChatId } = useParams<{ id?: string }>();

  const campaignId =
    typeof campaignChatId === "string" ? campaignChatId : "";
    const { data: campaign } = useCampaign(campaignId);

  const { isPinned, togglePin } = usePinnedCampaign(campaignId);

  return (
    <header className="sticky top-0 z-50 flex h-16 w-full shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-3 backdrop-blur md:px-5">
      {campaignId ? (
        <>
          <CampaignChatHeaderDetails />

          <div className="flex shrink-0 items-center justify-center">
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              className="md:hidden"
              aria-label="New chat"
              asChild
            >
              <Link href="/ai-campaign-builder">
                <PenBoxIcon className="size-5" />
              </Link>
            </Button>

            <CampaignChatActionsMenu
              campaignId={campaignId}
              isPinned={isPinned}
              onTogglePin={togglePin}
              title={campaign?.name ?? "Campaign"}
            />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <SidebarTrigger className="flex shrink-0 text-foreground hover:bg-muted hover:text-foreground md:hidden" />
          <h1 className="font-semibold">New Campaign Chat</h1>
        </div>
      )}
    </header>
  );
}