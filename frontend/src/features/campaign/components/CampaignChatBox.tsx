import { Link2, Star, Globe, Mic, Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function CampaignChatBox() {
  return (
    <div className='shrink-0 border-t bg-gray-50 p-3 sm:p-4'>
      <div className='rounded-2xl border-2 border-foreground/40 p-4'>
        {/* Input */}
        <Textarea
          placeholder='Ask anything or give instructions'
          className='min-h-10 max-h-40 resize-none border-0 bg-transparent p-0 shadow-none focus-visible:ring-0 wrap-anywhere'
        />

        {/* Actions */}
        <div className='mt-4 flex items-center justify-between'>
          {/* Left Icons */}
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='border border-foreground/20'
            >
              <Link2 className='size-4' />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              className='border border-foreground/20'
            >
              <Star className='size-4' />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              className='border border-foreground/20'
            >
              <Globe className='size-4' />
            </Button>
          </div>

          {/* Right Icons */}
          <div className='flex items-center gap-2'>
            <Button
              variant='ghost'
              size='icon'
              className='border border-foreground/20'
            >
              <Mic className='size-4' />
            </Button>

            <Button
              variant='ghost'
              size='icon'
              className='border border-foreground/20 bg-[#934DC5] text-white'
            >
              <Send className='size-4' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
