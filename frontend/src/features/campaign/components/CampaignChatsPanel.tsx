import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  BadgePercent,
  Dot,
  EllipsisVertical,
  Funnel,
  HandPlatter,
  Pin,
  Plus,
  PlusIcon,
  Search,
  Stars,
} from 'lucide-react';
import { CampaignChat } from './CampaignChat';
import type { CampaignChat as CampaignChatType } from '../types';

const todaysChat: CampaignChatType[] = [
  {
    id: '20205166',
    title: 'Black Friday Promo',
    status: 'draft',
    time: '9:37 AM',
  },
  {
    id: '20205167',
    title: 'WhatsApp Funnel Design',
    status: 'completed',
    time: '9:37 AM',
  },
  {
    id: '20205168',
    title: 'Product Launch Campaign',
    status: 'draft',
    time: '7:35 PM',
  },
];
const yesterdayChat: CampaignChatType[] = [
  { id: '20205169', title: 'E-commerce Cart', status: 'draft', time: 'MON' },
  {
    id: '20205161',
    title: 'Facebook Ads Campaign',
    status: 'completed',
    time: 'MON',
  },
];
const thisWeeksChat: CampaignChatType[] = [
  {
    id: '20205160',
    title: 'Email Marketing',
    status: 'draft',
    time: '9:37 AM',
  },
  {
    id: '2020510',
    title: 'Email Marketing',
    status: 'draft',
    time: '9:37 AM',
  },
  {
    id: '2205160',
    title: 'Email Marketing',
    status: 'draft',
    time: '9:37 AM',
  },
  {
    id: '2020g160',
    title: 'Email Marketing',
    status: 'draft',
    time: '9:37 AM',
  },
  {
    id: '2020y160',
    title: 'Email Marketing',
    status: 'draft',
    time: '9:37 AM',
  },
];

export function CampaignChatsPanel() {
  return (
    <div className='bg-[#F2F6FF] p-4 h-full overflow-y-auto'>
      {/* Header */}
      <div className='flex items-center gap-3 justify-between'>
        <div className='flex gap-2'>
          <Stars />
          <h2 className='text-sm font-bold'>Campaign Chats</h2>
        </div>

        <Button variant='ghost' size='icon'>
          <Plus className='size-5' />
        </Button>
      </div>

      {/* filter & search */}
      <div className='flex items-center gap-10 justify-between mt-4'>
        <div className='relative flex-1'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground' />

          <Input
            type='text'
            placeholder='Search chats...'
            className='pl-10 border-foreground'
          />
        </div>

        <Button variant='ghost' size='icon'>
          <Funnel className='size-4' />
        </Button>
      </div>

      {/* chats */}
      <>
        {/* Pinned */}
        <div className='mt-6 space-y-1'>
          <h3 className='text-sm '>Pinned</h3>
          <div className='bg-[#934DC521] flex justify-between items-center gap-3 text-xs pt-2 px-2 rounded-md'>
            <div className='flex gap-2 items-center'>
              <HandPlatter className='size-5' />

              <div>
                <h2 className='line-clamp-1 font-medium'>
                  Real Estate Email Campaign
                </h2>
                <div className='flex gap-1 items-center'>
                  <span className='text-foreground/80'>Draft</span>
                  <Dot />
                  <span className='text-foreground/80'>Just now</span>
                </div>
              </div>
            </div>

            <Button variant='ghost' size='icon' className='p-0'>
              <Pin className='size-5' />
            </Button>
          </div>
        </div>

        {/* Today */}
        <div className='mt-6 space-y-1'>
          <h3 className='text-sm '>Today</h3>
          <div className='space-y-2'>
            {todaysChat.map((chat) => (
              <CampaignChat key={chat.id} {...chat} />
            ))}
          </div>
        </div>

        {/* Yesterday */}
        <div className='mt-6 space-y-1'>
          <h3 className='text-sm '>Yesterday</h3>
          <div className='space-y-2'>
            {yesterdayChat.map((chat) => (
              <CampaignChat key={chat.id} {...chat} />
            ))}
          </div>
        </div>

        {/* This week */}
        <div className='mt-6 space-y-1'>
          <h3 className='text-sm'>This Week</h3>
          <div className='space-y-2'>
            {thisWeeksChat.map((chat) => (
              <CampaignChat key={chat.id} {...chat} />
            ))}
          </div>
        </div>
      </>

      {/* new campaign chat */}

      <div className='flex justify-center items-center mt-4'>
        <Button variant='ghost' className='text-[#9500FF] hover:text-[#9143c9]'>
          <Plus />
          <span>New Campaign Chat</span>
        </Button>
      </div>
    </div>
  );
}
