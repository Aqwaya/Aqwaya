import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Archive,
  CheckCircle2,
  Download,
  EllipsisVertical,
  LoaderCircle,
  Pencil,
  Pin,
  PinOff,
  Trash2,
} from 'lucide-react';
import type { CampaignChat } from '../types';

export function CampaignChat({ title, status, pinned }: CampaignChat) {
  const PinIcon = pinned ? PinOff : Pin;
  const isCompleted = status === 'completed';
  const StatusIcon = isCompleted ? CheckCircle2 : LoaderCircle;
  const statusLabel = isCompleted ? 'Completed' : 'In progress';

  return (
    <div className='border border-foreground/20 hover:border-foreground/40 hover:bg-background/70 flex justify-between items-center gap-3 text-xs p-2 rounded-md transition-colors'>
      <div className='flex min-w-0 gap-2 items-center'>
        <span
          className={`flex size-8 shrink-0 items-center justify-center rounded-md ${
            isCompleted
              ? 'bg-green-50 text-green-600'
              : 'bg-blue-50 text-blue-600'
          }`}
        >
          <StatusIcon className='size-4' />
        </span>

        <div className='min-w-0 group-data-[collapsible=icon]:hidden'>
          <h2 className='line-clamp-1 font-medium'>
            {title} for my school resumprion and all
          </h2>
          <div className='mt-1'>
            <span
              className={`inline-flex h-5 items-center rounded-full px-2 text-[11px] font-medium ${
                isCompleted
                  ? 'bg-green-50 text-green-700'
                  : 'bg-blue-50 text-blue-700'
              }`}
            >
              {statusLabel}
            </span>
          </div>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            size='icon'
            className='size-7 shrink-0 p-0 group-data-[collapsible=icon]:hidden'
          >
            <EllipsisVertical className='size-5' />
            <span className='sr-only'>Open chat actions</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className='w-44'>
          <DropdownMenuItem>
            <PinIcon className='size-4' />
            <span>{pinned ? 'Unpin' : 'Pin'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Pencil className='size-4' />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Download className='size-4' />
            <span>Export</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Archive className='size-4' />
            <span>Archive</span>
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
