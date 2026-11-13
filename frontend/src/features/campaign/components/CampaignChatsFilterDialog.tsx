import { Check, CheckCircle2, Filter, LoaderCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { cn } from '@/lib/utils';
import type { CampaignChat } from '../types';

export type CampaignChatStatusFilter = 'all' | 'in-progress' | 'completed';

type CampaignChatsFilterDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  value: CampaignChatStatusFilter;
  onValueChange: (value: CampaignChatStatusFilter) => void;
  chats: CampaignChat[];
};

const filterOptions: Array<{
  value: CampaignChatStatusFilter;
  label: string;
  icon: typeof Filter;
  iconClassName: string;
  selectedClassName: string;
}> = [
  {
    value: 'all',
    label: 'All chats',
    icon: Filter,
    iconClassName: 'bg-muted text-muted-foreground',
    selectedClassName: 'border-foreground/20 bg-muted/60 text-foreground',
  },
  {
    value: 'in-progress',
    label: 'In progress',
    icon: LoaderCircle,
    iconClassName: 'bg-blue-100 text-blue-600',
    selectedClassName: 'border-blue-200 bg-blue-50 text-blue-700',
  },
  {
    value: 'completed',
    label: 'Completed',
    icon: CheckCircle2,
    iconClassName: 'bg-green-100 text-green-600',
    selectedClassName: 'border-green-200 bg-green-50 text-green-700',
  },
];

export function CampaignChatsFilterDialog({
  open,
  onOpenChange,
  value,
  onValueChange,
  chats,
}: CampaignChatsFilterDialogProps) {
  const getFilterCount = (filter: CampaignChatStatusFilter) => {
    if (filter === 'all') return chats.length;

    return chats.filter((chat) => chat.status === filter).length;
  };

  const handleSelectFilter = (filter: CampaignChatStatusFilter) => {
    onValueChange(filter);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className='bottom-0 left-0 top-auto w-screen max-w-none translate-x-0 translate-y-0 gap-4 rounded-b-none rounded-t-xl p-0 sm:bottom-auto sm:left-1/2 sm:top-1/2 sm:w-full sm:max-w-sm sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl'
      >
        <DialogHeader className='border-b border-border/70 px-5 pb-4 pt-5'>
          <div className='flex items-center gap-3 pr-8'>
            <span className='flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700'>
              <Filter className='size-4' />
            </span>
            <DialogTitle className='text-base'>Filter chats</DialogTitle>
          </div>
        </DialogHeader>

        <div className='grid gap-2 px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-5'>
          {filterOptions.map((option) => {
            const isSelected = option.value === value;
            const OptionIcon = option.icon;

            return (
              <button
                key={option.value}
                type='button'
                className={cn(
                  'flex w-full items-center justify-between gap-3 rounded-md border p-3 text-left text-sm transition-colors focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40',
                  isSelected
                    ? option.selectedClassName
                    : 'border-foreground/15 bg-background text-foreground hover:border-foreground/35 hover:bg-muted/50',
                )}
                onClick={() => handleSelectFilter(option.value)}
              >
                <span className='flex min-w-0 items-center gap-3'>
                  <span
                    className={cn(
                      'flex size-9 shrink-0 items-center justify-center rounded-md',
                      option.iconClassName,
                    )}
                  >
                    <OptionIcon className='size-4' />
                  </span>
                  <span className='min-w-0'>
                    <span className='block truncate font-medium'>
                      {option.label}
                    </span>
                    <span className='mt-1 text-[11px] font-medium text-muted-foreground'>
                      {getFilterCount(option.value)} chats
                    </span>
                  </span>
                </span>

                {isSelected && <Check className='size-4 shrink-0' />}
              </button>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}
