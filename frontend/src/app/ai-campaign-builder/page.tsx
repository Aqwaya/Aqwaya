import { CampaignChatBox } from '@/features/campaign/components/CampaignChatBox';

export default function page() {
  return (
    <section className='relative h-full min-h-0 overflow-hidden md:overflow-y-auto'>
      <div className='flex h-full min-h-0 min-w-0 flex-col md:min-h-full md:items-center md:justify-center md:p-6'>
        <div className='w-full max-w-3xl md:grid md:grid-rows-[auto_minmax(13rem,auto)] md:gap-5'>
          <div className='hidden space-y-2 text-center md:block'>
            <h2 className='text-2xl font-semibold tracking-tight'>
              Start a new campaign chat
            </h2>
            {/* <p className='text-muted-foreground'>
              Ask anything to plan, write, or optimize your next campaign.
            </p> */}
          </div>
          <div className='fixed inset-x-0 bottom-0 z-10 md:static md:inset-auto md:bottom-auto md:flex md:min-h-52 md:w-full md:items-start'>
            <CampaignChatBox />
          </div>
        </div>
      </div>
    </section>
  );
}
