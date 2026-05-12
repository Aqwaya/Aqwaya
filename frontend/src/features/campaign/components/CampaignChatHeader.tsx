import { Button } from '@/components/ui/button';
import { Ellipsis, FileIcon, ShareIcon, StarsIcon } from 'lucide-react';

export function CampaignChatHeader() {
  return (
    <div className='shrink-0 border-b-2 bg-gray-50'>
      {/* top */}
      <div className='flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='space-y-1'>
          <h2 className='font-bold'>Real Estate Email Campaign</h2>
          <div className='flex gap-1 items-center'>
            <div className='bg-[#E3D6E8] items-center gap-1 flex rounded-md p-1'>
              <FileIcon className='size-4' />
              <span className='text-xs'> Draft</span>
            </div>

            <span className='text-foreground/80 text-xs'> Saved just now </span>
          </div>
        </div>

        {/* actions */}
        <div className='flex flex-wrap items-center gap-2'>
          <Button variant='ghost' className='border border-input'>
            <ShareIcon className='size-5' />
            <span>Export</span>
          </Button>
          <Button variant='ghost' className='border border-input' size='icon'>
            <Ellipsis className='size-5' />
          </Button>
          <Button
            variant='ghost'
            className='bg-foreground text-white hover:bg-foreground/95 hover:text-white'
          >
            <StarsIcon className='size-5' />
            <span>New Chat</span>
          </Button>
        </div>
      </div>

      {/* bottom */}
      <div className='px-4 py-3 border-t-4 border-b b'>
        <h2 className='font-semibold'>Aqwaya.AI</h2>
      </div>
    </div>
  );
}
