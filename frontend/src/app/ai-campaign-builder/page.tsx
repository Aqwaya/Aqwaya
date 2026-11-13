'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Sparkles, Stars } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { createCampaign } from '@/features/campaign/api';

export default function Page() {
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);

  const handleCreateCampaign = async () => {
    try {
      setIsCreating(true);

      const campaign = await createCampaign('New Campaign');
      const campaignId =
        'id' in campaign
          ? String(campaign.id)
          : 'campaignId' in campaign
            ? String(campaign.campaignId)
            : '';

      if (!campaignId) {
        throw new Error('Campaign ID is missing from the response');
      }

      router.push(`/ai-campaign-builder/${campaignId}`);
    } catch (error) {
      console.error('Failed to create campaign:', error);
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <section className="flex h-full min-h-0 items-center justify-center overflow-hidden px-4 py-8">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <div className="mb-6 flex size-16 items-center justify-center rounded-md bg-gray-50 text-gray-900">
          <Sparkles className="size-8" aria-hidden="true" />
        </div>

        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          AI Campaign Builder
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          Have a conversation with your AI business strategist. It will ask the
          right questions and build you a complete sales system &mdash; a page,
          email follow-ups, and WhatsApp messages.
        </p>

        <Button
          type="button"
          onClick={handleCreateCampaign}
          disabled={isCreating}
          className="mt-8 bg-gray-900 px-8 py-5 text-sm font-semibold hover:bg-gray-800"
        >
          <Stars />
          {isCreating ? 'Creating campaign...' : 'Start a new campaign'}
        </Button>
      </div>
    </section>
  );
}