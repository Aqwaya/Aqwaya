'use client';

import { FormEvent, useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';

type CampaignRenameChatDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTitle: string;
  onRename: (title: string) => void;
};

export function CampaignRenameChatDialog({
  open,
  onOpenChange,
  initialTitle,
  onRename,
}: CampaignRenameChatDialogProps) {
  const [title, setTitle] = useState(initialTitle);
  const trimmedTitle = title.trim();
  const canSave =
    trimmedTitle.length > 0 && trimmedTitle !== initialTitle.trim();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    console.log(trimmedTitle);

    // event.preventDefault();

    // if (!canSave) return;

    // onRename(trimmedTitle);
    // onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='gap-5 sm:max-w-md'>
        <DialogHeader>
          <DialogTitle className='text-base'>Rename chat</DialogTitle>
          <DialogDescription>
            Update the title shown in your campaign chat history.
          </DialogDescription>
        </DialogHeader>

        <form className='grid gap-5' onSubmit={handleSubmit}>
          <Input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder='Enter chat title'
            className='py-5'
            maxLength={120}
            autoFocus
          />

          <DialogFooter>
            <Button
              type='button'
              variant='outline'
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type='submit' disabled={!canSave}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
