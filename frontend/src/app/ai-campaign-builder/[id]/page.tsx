'use client';

import { CampaignChatMessages } from '@/features/campaign/components/CampaignChatMessages';
import { CampaignChatBox } from '@/features/campaign/components/CampaignChatBox';
import { useCampaigns } from '@/features/campaign/hooks/useCampaigns';

export default function page() {
  const { data: campaigns } = useCampaigns();

  console.log(campaigns);

  return (
    <section className='h-full min-h-0 overflow-hidden'>
      <div className='flex h-full min-h-0 min-w-0 flex-col'>
        <div className='min-h-0 flex-1 overflow-y-auto'>
          <CampaignChatMessages />
        </div>
        <CampaignChatBox />
      </div>
    </section>
  );
}
