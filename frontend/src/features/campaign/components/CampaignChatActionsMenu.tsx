'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { ConfirmDelete } from '@/components/ConfirmDelete';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  EllipsisVertical,
  PenBoxIcon,
  PinIcon,
  PinOff,
  Trash2,
} from 'lucide-react';
import { CampaignRenameChatDialog } from './CampaignRenameChatDialog';

export function CampaignChatActionsMenu({
  className,
  isPinned,
  title = 'chat',
}: {
  className?: string;
  isPinned: boolean;
  title?: string;
}) {
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);

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
            {isPinned ? (
              <PinIcon className='size-4' />
            ) : (
              <PinOff className='size-4' />
            )}
            <span>{isPinned ? 'Unpin' : 'Pin'}</span>
          </DropdownMenuItem>
          <DropdownMenuItem onSelect={() => setOpenRenameDialog(true)}>
            <PenBoxIcon className='size-4' />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            variant='destructive'
            onSelect={() => setOpenDeleteDialog(true)}
          >
            <Trash2 className='size-4' />
            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <ConfirmDelete
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={() => {}}
        resourceName='chat'
      />

      {openRenameDialog && (
        <CampaignRenameChatDialog
          open={openRenameDialog}
          onOpenChange={setOpenRenameDialog}
          onRename={() => {}}
          initialTitle={title}
        />
      )}
    </div>
  );
}
