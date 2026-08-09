import { useMemo, useState } from 'react';
import {
  CheckCircle2,
  LoaderCircle,
  Pin,
  Search,
  Sparkles,
} from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import type { CampaignChat } from '../types';

type CampaignSearchChatsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  chats: CampaignChat[];
};

export function CampaignSearchChatsDialog({
  open,
  onOpenChange,
  chats,
}: CampaignSearchChatsDialogProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const trimmedQuery = searchQuery.trim().toLowerCase();

  const filteredChats = useMemo(() => {
    if (!trimmedQuery) return chats;

    return chats.filter((chat) =>
      chat.title.toLowerCase().includes(trimmedQuery),
    );
  }, [chats, trimmedQuery]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        aria-describedby={undefined}
        className='left-0 top-0 h-dvh max-h-dvh w-screen max-w-none translate-x-0 translate-y-0 grid-rows-[auto_auto_minmax(0,1fr)] gap-4 rounded-none p-0 sm:left-1/2 sm:top-1/2 sm:h-[520px] sm:max-h-[520px] sm:w-full sm:max-w-xl sm:-translate-x-1/2 sm:-translate-y-1/2 sm:rounded-xl'
      >
        <DialogHeader className='border-b border-border/70 px-5 pb-4 pt-[calc(1.25rem+env(safe-area-inset-top))] sm:pt-5'>
          <div className='flex items-center gap-3 pr-8'>
            <span className='flex size-9 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-700'>
              <Sparkles className='size-4' />
            </span>
            <div className='min-w-0'>
              <DialogTitle className='text-base'>Search chats</DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className='px-5'>
          <div className='relative'>
            <Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              placeholder='Search by chat title...'
              className='h-11 rounded-lg border-border bg-background pl-9 pr-3'
              autoFocus
            />
          </div>
        </div>

        <div className='min-h-0 overflow-y-auto px-5 pb-[calc(1.25rem+env(safe-area-inset-bottom))] sm:pb-5'>
          {filteredChats.length > 0 ? (
            <div className='grid gap-2'>
              {filteredChats.map((chat) => {
                const isCompleted = chat.status === 'completed';
                const StatusIcon = isCompleted ? CheckCircle2 : LoaderCircle;
                const statusLabel = isCompleted ? 'Completed' : 'In progress';

                return (
                  <button
                    key={chat.id}
                    type='button'
                    className='flex w-full items-center justify-between gap-3 rounded-md border border-foreground/15 bg-background p-3 text-left text-sm transition-colors hover:border-foreground/35 hover:bg-muted/50 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/40'
                    onClick={() => onOpenChange(false)}
                  >
                    <div className='flex min-w-0 items-center gap-3'>
                      <span
                        className={cn(
                          'flex size-9 shrink-0 items-center justify-center rounded-md',
                          isCompleted
                            ? 'bg-green-50 text-green-600'
                            : 'bg-blue-50 text-blue-600',
                        )}
                      >
                        <StatusIcon className='size-4' />
                      </span>

                      <span className='min-w-0'>
                        <span className='flex min-w-0 items-center gap-1.5'>
                          <span className='truncate font-medium text-foreground'>
                            {chat.title}
                          </span>
                          {chat.pinned && (
                            <Pin className='size-3.5 shrink-0 text-muted-foreground' />
                          )}
                        </span>
                        <span className='mt-1 flex items-center gap-2'>
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
                          <span className='text-xs text-muted-foreground'>
                            {chat.time}
                          </span>
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          ) : (
            <div className='flex h-full gap-3 text-center'>
              <p className='text-sm font-medium text-foreground'>No results</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
