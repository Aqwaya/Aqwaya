import React from 'react';

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AuthGuard from '@/components/authguard';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CampaignChatsPanel } from '@/features/campaign/components/CampaignChatsPanel';
import {
  Archive,
  Download,
  EllipsisVertical,
  Pencil,
  Plus,
  PinOff,
  Trash2,
  PenBoxIcon,
} from 'lucide-react';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider
      // style={{ '--sidebar-width': '20.5rem' } as React.CSSProperties}
      >
        <CampaignChatsPanel />

        <SidebarInset className='h-svh overflow-hidden'>
          <header className='sticky top-0 z-50 flex py-2 w-full shrink-0 items-center justify-between gap-3 border-b border-border/70 bg-background/90 px-3 backdrop-blur  md:px-5  '>
            <div className='flex min-w-0 items-center gap-2'>
              <SidebarTrigger className='shrink-0 text-foreground hover:bg-muted hover:text-foreground md:hidden' />

              <div className='min-w-0'>
                <h1 className='truncate text-sm font-semibold text-foreground w-2/3 md:max-w-1/4'>
                  Black Friday PromoCampaign BuilderCampaign BuilderCampaign
                  BuilderCampaign BuilderCampaign BuilderCampaign
                  BuilderCampaign BuilderCampaign BuilderCampaign
                  BuilderCampaign BuilderCampaign BuilderCampaign Builder
                </h1>
                <span className='mt-1 inline-flex h-5 items-center rounded-full bg-blue-50 px-2 text-[11px] font-medium text-blue-700'>
                  In progress
                </span>
              </div>
            </div>

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
                  >
                    <EllipsisVertical className='size-5' />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className='w-44'>
                  <DropdownMenuItem>
                    <PinOff className='size-4' />
                    <span>Unpin</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Pencil className='size-4' />
                    <span>Rename</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Download className='size-4' />
                    <span>Export</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Archive className='size-4' />
                    <span>Archive</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant='destructive'>
                    <Trash2 className='size-4' />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>

          <main className='bg-background min-h-0 flex-1 w-full overflow-hidden'>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
