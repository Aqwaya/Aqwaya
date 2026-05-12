import { CampaignChatBox } from '@/features/campaign/components/CampaignChatBox';
import { CampaignChatHeader } from '@/features/campaign/components/CampaignChatHeader';
import { CampaignChatMessages } from '@/features/campaign/components/CampaignChatMessages';
import { CampaignChatsPanel } from '@/features/campaign/components/CampaignChatsPanel';

export default function page() {
  return (
    <section className='grid h-full min-h-0 grid-cols-1 overflow-hidden lg:grid-cols-[328px_minmax(0,1fr)]'>
      <div className='hidden min-h-0 lg:block'>
        <CampaignChatsPanel />
      </div>

      <div className='flex min-h-0 min-w-0 flex-col bg-gray-50'>
        <CampaignChatHeader />
        <div className='min-h-0 flex-1 overflow-y-auto'>
          <CampaignChatMessages />
        </div>
        <CampaignChatBox />
      </div>
    </section>
  );
}
