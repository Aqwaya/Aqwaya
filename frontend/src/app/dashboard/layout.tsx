import React from 'react';

import { DashboardSidebar } from '@/components/DashboardSidebar';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <header className='flex bg-background z-50 py-3 md:py-5 top-0 w-full sticky shrink-0 items-center gap-2 border-b pr-4'>
          <SidebarTrigger />
          <h2>Dashboard</h2>
        </header>

        <main className='p-4 bg-gray-50 h-full w-full'>{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
