'use client';

import { useRef, useState } from 'react';
import { Send } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

export function CampaignChatBox() {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const canSend = message.trim().length > 0;

  return (
    <div className='shrink-0 bg-background px-3 pb-3 pt-2 sm:px-4 sm:pb-5'>
      <form
        className='mx-auto flex max-w-3xl cursor-text flex-col rounded-2xl border border-border bg-white p-2 shadow-sm transition-[border-color,box-shadow] focus-within:border-blue-300 focus-within:shadow-md'
        onClick={() => textareaRef.current?.focus()}
        onSubmit={(event) => {
          event.preventDefault();
        }}
      >
        <Textarea
          ref={textareaRef}
          placeholder='Ask anything or give instructions'
          rows={1}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className='max-h-40 min-h-14 resize-none overflow-y-auto border-0 bg-transparent px-2 py-2 text-sm leading-6 shadow-none [scrollbar-color:#93c5fd_transparent] [scrollbar-width:thin] focus-visible:ring-0 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent'
        />

        <div className='flex justify-end'>
          <Button
            type='submit'
            size='icon'
            disabled={!canSend}
            className='size-9 shrink-0 cursor-pointer rounded-xl bg-blue-600 text-white shadow-none hover:bg-blue-700 disabled:bg-muted disabled:text-muted-foreground'
            aria-label='Send message'
          >
            <Send className='size-4' />
          </Button>
        </div>
      </form>
    </div>
  );
}
