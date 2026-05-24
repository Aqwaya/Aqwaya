import React from 'react';

import AuthGuard from '@/components/authguard';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';
import { CampaignChatHeader } from '@/features/campaign/components/CampaignChatHeader';
import { CampaignChatsPanel } from '@/features/campaign/components/CampaignChatsPanel';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // <AuthGuard>
    <SidebarProvider
      style={{ '--sidebar-width': '20.5rem' } as React.CSSProperties}
    >
      <CampaignChatsPanel />

      <SidebarInset className='h-svh overflow-hidden'>
        <CampaignChatHeader />

        <main className='bg-background min-h-0 flex-1 w-full overflow-hidden flex flex-col'>
          <div className='min-h-0 flex-1 overflow-hidden'>{children}</div>
        </main>
      </SidebarInset>
    </SidebarProvider>
    // </AuthGuard>
  );
}
