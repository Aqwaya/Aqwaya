import { CheckCircle2, LoaderCircle } from 'lucide-react';
import Link from 'next/link';
import type { CampaignChat } from '../types';
import { CampaignChatActionsMenu } from './CampaignChatActionsMenu';
import { cn } from '@/lib/utils';

type CampaignChatProps = CampaignChat & {
  isActive?: boolean;
};

export function CampaignChat({
  id,
  title,
  status,
  pinned,
  isActive = false,
}: CampaignChatProps) {
  const isCompleted = status === 'completed';
  const StatusIcon = isCompleted ? CheckCircle2 : LoaderCircle;
  const statusLabel = isCompleted ? 'Completed' : 'In progress';

  return (
    <div
      className={cn(
        'relative flex items-center justify-between gap-3 rounded-md border p-2 text-xs transition-colors',
        isActive
          ? 'border-foreground/50 shadow-xs'
          : 'border-foreground/20 hover:border-foreground/40 hover:bg-background/70',
      )}
    >
      {isActive && (
        <span className='absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-foreground' />
      )}
      <Link
        href={`/ai-campaign-builder/${id}`}
        aria-current={isActive ? 'page' : undefined}
        className='flex min-w-0 flex-1 gap-2 items-center pl-1'
      >
        <span
          className={cn(
            'flex size-8 shrink-0 items-center justify-center rounded-md',
            isCompleted
              ? 'bg-green-50 text-green-600'
              : 'bg-blue-50 text-blue-600',
          )}
        >
          <StatusIcon className='size-4' />
        </span>

        <div className='min-w-0 group-data-[collapsible=icon]:hidden'>
          <h2
            className={cn(
              'line-clamp-1 font-medium',
              isActive && 'text-foreground',
            )}
          >
            {title} for my school resumprion and all
          </h2>
          <div className='mt-1'>
            <span
              className={cn(
                'inline-flex h-5 items-center rounded-full px-2 text-[11px] font-medium',
                isCompleted
                  ? 'bg-green-50 text-green-700'
                  : 'bg-blue-50 text-blue-700',
              )}
            >
              {statusLabel}
            </span>
          </div>
        </div>
      </Link>

      <CampaignChatActionsMenu
        className='size-7 shrink-0 p-0 group-data-[collapsible=icon]:hidden'
        isPinned={pinned}
        title={title}
      />
    </div>
  );
}
