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
import { ArrowLeft, Filter, PenBoxIcon, Pin, Search } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import type { CampaignChat as CampaignChatType } from '../types';
import { CampaignChat } from './CampaignChat';
import {
  CampaignChatsFilterDialog,
  type CampaignChatStatusFilter,
} from './CampaignChatsFilterDialog';
import { CampaignSearchChatsDialog } from './CampaignSearchChatsDialog';
import { cn } from '@/lib/utils';

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
    pinned: false,
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
    pinned: false,
  },
  {
    id: '20205161',
    title: 'Facebook Ads Campaign',
    status: 'completed',
    time: 'MON',
    pinned: false,
  },
];
const thisWeeksChat: CampaignChatType[] = [
  {
    id: '20205160',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
    pinned: false,
  },
  {
    id: '2020510',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
    pinned: false,
  },
  {
    id: '2205160',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
    pinned: false,
  },
  {
    id: '2020g160',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
    pinned: false,
  },
  {
    id: '2020y160',
    title: 'Email Marketing',
    status: 'in-progress',
    time: '9:37 AM',
    pinned: false,
  },
];

export function CampaignChatsPanel() {
  const [openSearchDialog, setOpenSearchDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [statusFilter, setStatusFilter] =
    useState<CampaignChatStatusFilter>('all');
  const chats = [...todaysChat, ...yesterdayChat, ...thisWeeksChat];
  const visibleChats =
    statusFilter === 'all'
      ? chats
      : chats.filter((chat) => chat.status === statusFilter);
  const pinnedChats = visibleChats.filter((chat) => chat.pinned);
  const recentChats = visibleChats.filter((chat) => !chat.pinned);
  const isFilterActive = statusFilter !== 'all';

  const handleOpenSearchDialog = () => setOpenSearchDialog(true);
  const handleOpenFilterDialog = () => setOpenFilterDialog(true);
  const filterIndicatorClassName =
    statusFilter === 'completed' ? 'bg-green-600' : 'bg-blue-600';

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
              asChild
              tooltip='New chat'
              className='h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center'
            >
              <Link href='/ai-campaign-builder'>
                <PenBoxIcon className='size-4' />
                <span className='group-data-[collapsible=icon]:hidden'>
                  New chat
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip='Search chats'
              className='h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center'
              onClick={handleOpenSearchDialog}
            >
              <Search className='size-4' />
              <span className='group-data-[collapsible=icon]:hidden'>
                Search chats
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <CampaignSearchChatsDialog
            open={openSearchDialog}
            onOpenChange={setOpenSearchDialog}
            chats={chats}
          />

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip='Filter'
              className='h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center'
              onClick={handleOpenFilterDialog}
            >
              <span className='relative'>
                <Filter className='size-4' />
                {isFilterActive && (
                  <span
                    className={cn(
                      'absolute -right-1 -top-1 size-2 rounded-full',
                      filterIndicatorClassName,
                    )}
                  />
                )}
              </span>
              <span className='group-data-[collapsible=icon]:hidden'>
                Filter
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <CampaignChatsFilterDialog
            open={openFilterDialog}
            onOpenChange={setOpenFilterDialog}
            value={statusFilter}
            onValueChange={setStatusFilter}
            chats={chats}
          />
        </SidebarMenu>
      </SidebarHeader>

      {/* chat */}
      <SidebarContent className='px-2 py-3 bg-background'>
        <SidebarGroup className='p-0 group-data-[collapsible=icon]:hidden'>
          {/* Pinned Chats */}
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

          {/* Recent Chats */}
          <SidebarGroupLabel className='px-2 text-sm text-foreground'>
            Recent
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
