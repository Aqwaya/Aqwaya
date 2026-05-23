import { Button } from '@/components/ui/button';
import { PenBoxIcon } from 'lucide-react';
import Link from 'next/link';
import { CampaignChatActionsMenu } from './CampaignChatActionsMenu';
import { CampaignChatHeaderDetails } from './CampaignChatHeaderDetails';

export function CampaignChatHeader() {
  return (
    <header className='sticky top-0 z-50 flex py-2 w-full shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-3 backdrop-blur md:px-5'>
      <CampaignChatHeaderDetails />

      <div className='flex items-center justify-center'>
        <Button
          type='button'
          variant='ghost'
          size='icon-sm'
          className='md:hidden'
          aria-label='New chat'
          asChild
        >
          <Link href='/ai-campaign-builder'>
            <PenBoxIcon className='size-5' />
          </Link>
        </Button>

        <CampaignChatActionsMenu isPinned={false} />
      </div>
    </header>
  );
}
