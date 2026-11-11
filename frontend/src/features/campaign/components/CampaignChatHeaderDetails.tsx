"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { useParams } from "next/navigation";
import { useCampaign } from "../hooks/useCampaign";

export function CampaignChatHeaderDetails() {
  const params = useParams<{ id: string }>();
  const campaignId = params.id;

  const {
    data: campaign,
    isLoading,
    isError,
  } = useCampaign(campaignId);

  return (
    <div className="flex min-w-0 flex-1 items-center gap-3">
      <SidebarTrigger className="shrink-0 text-foreground hover:bg-muted hover:text-foreground md:hidden" />

      <div className="min-w-0 flex-1">
        <h1
          title={campaign?.name}
          className="truncate text-sm font-semibold text-foreground md:text-base"
        >
          {isLoading
            ? "Loading campaign..."
            : isError
              ? "Unable to load campaign"
              : campaign?.name || "New Campaign"}
        </h1>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Campaign conversation
        </p>
      </div>
    </div>
  );
}