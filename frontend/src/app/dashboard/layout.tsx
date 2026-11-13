import React from 'react';

import { DashboardSidebar } from '@/components/DashboardSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import AuthGuard from '@/components/authguard';
import { DashboardBreadcrumb } from '@/components/DashboardBreadcrumb';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <SidebarProvider>
        <DashboardSidebar />

        <SidebarInset className='h-svh overflow-hidden'>
          <header className='flex bg-background z-50 py-3 md:py-5 top-0 w-full sticky shrink-0 items-center gap-2 border-b pr-4'>
            <SidebarTrigger />
            <DashboardBreadcrumb />
          </header>

          <main className='bg-gray-50 min-h-0 flex-1 w-full overflow-hidden'>
            {children}
          </main>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}
