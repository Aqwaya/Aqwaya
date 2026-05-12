import { Stars, User } from 'lucide-react';

type Message = {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
  time: string;
  suggestions?: string[];
};

const messages: Message[] = [
  {
    id: 1,
    sender: 'user',
    text: 'Hey, how is the campaign performance going?',
    time: '9:31 AM',
  },
  {
    id: 2,
    sender: 'assistant',
    text: 'The current campaign has a 12% conversion increase this week.',
    time: '9:32 AM',
  },
  {
    id: 3,
    sender: 'user',
    text: 'That’s good.',
    time: '9:33 AM',
  },
  {
    id: 4,
    sender: 'user',
    text: 'Can you also show the top performing ad set?',
    time: '9:34 AM',
  },
  {
    id: 5,
    sender: 'assistant',
    text: "That's exactly what we're here for, Titus. Since you're running a digital agency, I want to make sure we're focused on the right path. Are you looking to get more people to buy a specific service package directly, or is your goal to get more potential clients to book a consultation call with you?",
    time: '9:36 AM',
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
    <div className='flex flex-col gap-3 p-4'>
      {messages.map((message) => {
        const isUser = message.sender === 'user';

        if (!isUser) {
          return (
            <div key={message.id} className='flex justify-start'>
              <div className='max-w-full sm:max-w-[75%]'>
                <div className='mb-2 flex items-center gap-2'>
                  <div className='flex size-8 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(220.47deg,#D996EF_8.37%,#0077FF_123.86%)] text-background'>
                    <Stars className='size-4' />
                  </div>
                  <span className='text-sm font-semibold'>Aqwaya.AI</span>
                </div>

                <div className='ml-10 rounded-2xl border bg-[#E9E7E7] px-4 py-3 text-sm'>
                  <p>{message.text}</p>
                  <span className='mt-1 block text-[11px] text-foreground/50'>
                    {message.time}
                  </span>
                </div>

                {message.suggestions && (
                  <div className='ml-10 mt-3 flex flex-wrap gap-2'>
                    {message.suggestions.map((suggestion) => (
                      <button
                        key={suggestion}
                        type='button'
                        className='rounded-lg w-fit border border-foreground/30 p-3 text-left text-sm font-medium text-[#6D2D9A]'
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        }

        return (
          <div key={message.id} className='flex items-start justify-end gap-2'>
            <div className='max-w-[calc(100%-2.5rem)] rounded-2xl bg-[#EDE9FD] px-4 py-3 text-sm sm:max-w-[75%]'>
              <p>{message.text}</p>
              <span className='mt-1 block text-right text-[11px] text-foreground/50'>
                {message.time}
              </span>
            </div>

            <div className='flex size-8 shrink-0 items-center justify-center rounded-full border border-foreground bg-[#D9D9D9]'>
              <User className='size-4' />
            </div>
          </div>
        );
      })}
    </div>
  );
}
