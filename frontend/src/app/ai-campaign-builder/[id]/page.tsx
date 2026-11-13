"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

import { CampaignChatMessages } from "@/features/campaign/components/CampaignChatMessages";
import { CampaignChatBox } from "@/features/campaign/components/CampaignChatBox";

export default function Page() {
  const params = useParams<{ id: string }>();
  const campaignId = params.id;

  const [message, setMessage] = useState("");

  return (
    <section className="flex h-full min-h-0 flex-col overflow-hidden bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto">
        <CampaignChatMessages
          campaignId={campaignId}
          onSuggestionSelect={setMessage}
        />
      </div>

      <CampaignChatBox
        campaignId={campaignId}
        message={message}
        setMessage={setMessage}
      />
    </section>
  );
}