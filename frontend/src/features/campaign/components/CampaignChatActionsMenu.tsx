import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EllipsisVertical, PenBoxIcon, PinOff, Trash2 } from 'lucide-react';

export function CampaignChatActionsMenu({ className }: { className?: string }) {
  return (
    <div className='flex shrink-0 items-center gap-2'>
      <Button
        type='button'
        variant='ghost'
        size='icon-sm'
        className='md:hidden'
        aria-label='New chat'
      >
        <PenBoxIcon className='size-5' />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type='button'
            variant='ghost'
            size='icon-sm'
            aria-label='More chat actions'
            className={className}
          >
            <EllipsisVertical className='size-5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-44'>
          <DropdownMenuItem>
            <PinOff className='size-4' />
            <span>Unpin</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PenBoxIcon className='size-4' />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem variant='destructive'>
            <Trash2 className='size-4' />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
