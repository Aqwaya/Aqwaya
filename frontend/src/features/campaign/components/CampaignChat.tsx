import { Button } from '@/components/ui/button';
import { BadgePercent, Dot, EllipsisVertical } from 'lucide-react';
import type { CampaignChat } from '../types';

export function CampaignChat({ title, status, time }: CampaignChat) {
  return (
    <div className='border border-foreground flex justify-between items-center gap-3 text-xs pt-2 px-2 rounded-md'>
      <div className='flex gap-2 items-center'>
        <BadgePercent className='size-5' />

        <div>
          <h2 className='line-clamp-1 font-medium'>{title}</h2>
          <div className='flex gap-1 items-center'>
            <span
              className={`capitalize ${status === 'completed' ? 'text-green-500' : 'text-foreground/80'}`}
            >
              {status}
            </span>
            <Dot />
            <span className='text-foreground/80'> {time} </span>
          </div>
        </div>
      </div>

      <Button variant='ghost' size='icon' className='p-0'>
        <EllipsisVertical className='size-5' />
      </Button>
    </div>
  );
}
