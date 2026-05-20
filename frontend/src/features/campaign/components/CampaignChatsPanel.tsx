'use client';

import { Logo } from '@/components/Logo';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { ArrowLeft, Filter, PenBoxIcon, Pin, Plus, Search } from 'lucide-react';
import Link from 'next/link';
import { CampaignChat } from './CampaignChat';
import type { CampaignChat as CampaignChatType } from '../types';

const todaysChat: CampaignChatType[] = [
  {
    id: '20205166',
    title: 'Black Friday Promo',
    status: 'in-progress',
    time: '9:37 AM',
    pinned: true,
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
    status: 'in-progress',
    time: '7:35 PM',
    pinned: true,
  },
];
const yesterdayChat: CampaignChatType[] = [
  {
    id: '20205169',
    title: 'E-commerce Cart',
    status: 'in-progress',
    time: 'MON',
  },
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
    status: 'in-progress',
    time: '9:37 AM',
  },
  {
    id: '2020510',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
  },
  {
    id: '2205160',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
  },
  {
    id: '2020g160',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
  },
  {
    id: '2020y160',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
  },
];

export function CampaignChatsPanel() {
  const chats = [...todaysChat, ...yesterdayChat, ...thisWeeksChat];
  const pinnedChats = chats.filter((chat) => chat.pinned);
  const recentChats = chats.filter((chat) => !chat.pinned);

  return (
    <Sidebar
      collapsible='icon'
      className='border-r border-border bg-background'
    >
      <SidebarHeader className='border-b border-border/70 bg-background p-0'>
        <div className='flex items-center border-b justify-between gap-2 group-data-[collapsible=icon]:justify-center'>
          <div className='flex min-w-0 items-center group-data-[collapsible=icon]:hidden'>
            <Logo className='shrink-0' />
            <div className='min-w-0'>
              <p className='truncate text-sm font-bold leading-tight text-foreground'>
                Aqwaya.ai
              </p>
              <p className='truncate text-xs text-muted-foreground'>
                Campaign Builder
              </p>
            </div>
          </div>
          <SidebarTrigger className='hidden shrink-0 text-foreground hover:bg-muted hover:text-foreground md:flex' />
        </div>

        <SidebarMenu className='p-1'>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip='New chat'
              className='h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center'
            >
              <PenBoxIcon className='size-4' />
              <span className='group-data-[collapsible=icon]:hidden'>
                New chat
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip='Search chats'
              className='h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center'
            >
              <Search className='size-4' />
              <span className='group-data-[collapsible=icon]:hidden'>
                Search chats
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip='Filter'
              className='h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center'
            >
              <Filter className='size-4' />
              <span className='group-data-[collapsible=icon]:hidden'>
                Filter
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className='px-2 py-3 bg-background'>
        <SidebarGroup className='p-0 group-data-[collapsible=icon]:hidden'>
          {pinnedChats.length > 0 && (
            <>
              <SidebarGroupLabel className='gap-1.5 px-2 text-sm text-foreground'>
                <Pin className='size-3.5' />
                Pinned
              </SidebarGroupLabel>
              <SidebarGroupContent className='mb-4'>
                <SidebarMenu className='gap-2'>
                  {pinnedChats.map((chat) => (
                    <SidebarMenuItem key={chat.id}>
                      <CampaignChat {...chat} />
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </>
          )}

          <SidebarGroupLabel className='px-2 text-sm text-foreground'>
            Recents
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className='gap-2'>
              {recentChats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <CampaignChat {...chat} />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className='border-t border-border/70 bg-background p-2'>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip='Back to dashboard'
              className='h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center'
            >
              <Link href='/dashboard'>
                <ArrowLeft className='size-4' />
                <span className='group-data-[collapsible=icon]:hidden'>
                  Back to dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
