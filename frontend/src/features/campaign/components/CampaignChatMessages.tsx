'use client';

import { Copy } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Message = {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  suggestions?: string[];
};

const messages: Message[] = [
  {
    id: 1,
    sender: 'user',
    text: 'Hey, how is the campaign performance going?',
  },
  {
    id: 40,
    sender: 'assistant',
    text: `That's exactly what we're here for, Titus. Since you're running a digital agency, I want to make sure we're focused on the right path. Are you looking to get more people to buy a specific service package directly, or is your goal to get more potential clients to book a consultation call with you?`,
  },
  {
    id: 2,
    sender: 'user',
    text: 'The current campaign has a 12% conversion increase this week. Your strongest lift is coming from the retargeting audience, while cold traffic is still spending too much before converting.',
  },
  {
    id: 3,
    sender: 'assistant',
    text: "That's good. Can you also show the top performing ad set?",
  },
  {
    id: 8,
    sender: 'user',
    text: "That's good. Can you also show the top performing ad set?",
  },
  {
    id: 4,
    sender: 'assistant',
    text: "That's exactly what we're here for, Titus. Since you're running a digital agency, I want to make sure we're focused on the right path. Are you looking to get more people to buy a specific service package directly, or is your goal to get more potential clients to book a consultation call with you?",
    suggestions: [
      'Sell a service package directly',
      'Book more consultation calls',
      'Find more interested people to sign up',
      'Win back people who went quiet',
    ],
  },
];

export function CampaignChatMessages() {
  return (
    <TooltipProvider>
      <div className='mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-4'>
        {messages.map((message) => {
          const isUser = message.sender === 'user';

          return (
            <article
              key={message.id}
              className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`min-w-0 ${
                  isUser ? 'max-w-[85%] sm:max-w-[70%]' : 'flex-1'
                }`}
              >
                <div
                  className={`rounded-2xl text-sm leading-6 ${
                    isUser
                      ? 'bg-muted px-4 py-3 text-foreground'
                      : 'bg-transparent text-foreground'
                  }`}
                >
                  <p>{message.text}</p>
                </div>

                {!isUser && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type='button'
                        variant='ghost'
                        size='icon-xs'
                        className='mt-2 text-muted-foreground hover:bg-blue-50 hover:text-blue-700'
                        aria-label='Copy response'
                      >
                        <Copy className='size-3.5' />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side='bottom' sideOffset={6}>
                      Copy response
                    </TooltipContent>
                  </Tooltip>
                )}

                {message.suggestions && (
                  <div className='mt-4 grid gap-2 sm:grid-cols-2'>
                    {message.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type='button'
                        className='rounded-xl border border-border bg-white px-4 py-3 text-left text-sm font-medium text-foreground shadow-xs transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700'
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </TooltipProvider>
  );
}
