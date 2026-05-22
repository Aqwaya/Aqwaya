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
import { CampaignChatHeader } from '@/features/campaign/components/CampaignChatHeader';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider
        style={{ '--sidebar-width': '20.5rem' } as React.CSSProperties}
      >
        <CampaignChatsPanel />

        <SidebarInset className='h-svh overflow-hidden'>
          <CampaignChatHeader />

          <main className='bg-background min-h-0 flex-1 w-full overflow-hidden'>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
