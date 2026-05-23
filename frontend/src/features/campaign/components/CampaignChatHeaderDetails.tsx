import { SidebarTrigger } from '@/components/ui/sidebar';

export function CampaignChatHeaderDetails() {
  return (
    <div className='flex min-w-0 items-center gap-2'>
      <SidebarTrigger className='shrink-0 text-foreground hover:bg-muted hover:text-foreground md:hidden' />

      <div className='min-w-0'>
        <h1 className='truncate text-sm font-semibold text-foreground w-2/3 md:max-w-1/4'>
          Black Friday PromoCampaign BuilderCampaign BuilderCampaign
          BuilderCampaign BuilderCampaign BuilderCampaign BuilderCampaign
          BuilderCampaign BuilderCampaign BuilderCampaign BuilderCampaign
          BuilderCampaign Builder
        </h1>
        <span className='mt-1 inline-flex h-5 items-center rounded-full bg-blue-50 px-2 text-[11px] font-medium text-blue-700'>
          In progress
        </span>
      </div>
    </div>
  );
}
