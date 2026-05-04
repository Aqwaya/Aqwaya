'use client';

import { Logo } from '@/components/Logo';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from '@/components/ui/sidebar';
import { navLinks } from '@/constants';
import { useLogout } from '@/features/auth/hooks/useLogout';
import { useUser } from '@/features/auth/hooks/useUser';
import {
  Bot,
  ChevronUp,
  LogOut,
  Settings,
  Sparkles,
  Target,
  User,
  Wand2,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { ComponentProps, useEffect, useState } from 'react';

const capitalizeFullName = (name: string): string => {
  if (!name) return 'Sarah Johnson';
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

export function DashboardSidebar(props: ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const { user } = useUser();

  const fullName = `${user?.firstName} ${user?.lastName}`;

  const router = useRouter();

  const { isMobile, setOpenMobile } = useSidebar();

  function logout() {
    localStorage.clear();
    router.replace('/auth/login');
  }

  const firstLetter = fullName.charAt(0).toUpperCase();

  const handleClose = () => {
    if (isMobile) setOpenMobile(false);
  };

  return (
    <Sidebar {...props} className='border-r border-border'>
      <SidebarHeader className='p-3 border-b border-border bg-background'>
        <div className='flex items-center space-x-1'>
          <Logo className='w-12 h-12' />
          <div className='flex flex-col'>
            <p className='text-lg font-bold'>Aqwaya.ai</p>
            <p className='text-xs text-muted-foreground'>
              AI Powered Marketing
            </p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className='px-3 bg-background overflow-y-auto'>
        <SidebarGroup>
          <SidebarMenu className='gap-1 mt-4'>
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;

              return (
                <SidebarMenuItem key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setTimeout(handleClose, 50)}
                    className={`flex items-center justify-between h-11 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? link.isAI
                          ? 'bg-linear-to-r from-purple-50 to-blue-50 text-purple-700 border border-purple-200'
                          : 'bg-blue-50 text-blue-700 border border-blue-200'
                        : 'text-gray-600 hover:text-foreground hover:bg-gray-50'
                    }`}
                  >
                    <div className='flex items-center space-x-3'>
                      <Icon className='w-5 h-5' />
                      <span>{link.label}</span>
                    </div>
                    {link.isAI && <Wand2 className='w-3 h-3 text-purple-500' />}
                  </Link>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>

        {/* AI Features Highlight */}
        <div className='mt-6 p-4 bg-linear-to-br from-purple-50 to-blue-50 rounded-lg border border-purple-200'>
          <div className='flex items-center space-x-2 mb-2'>
            <Sparkles className='w-4 h-4 text-purple-600' />
            <span className='text-sm font-semibold text-purple-700'>
              AI-Powered Features
            </span>
          </div>
          <p className='text-xs text-purple-600 mb-3'>
            Experience the power of AI across all marketing tools
          </p>
          <div className='space-y-1'>
            <div className='flex items-center space-x-2 text-xs text-purple-600'>
              <Bot className='w-3 h-3' />
              <span>Smart Email Campaigns</span>
            </div>
            <div className='flex items-center space-x-2 text-xs text-purple-600'>
              <Wand2 className='w-3 h-3' />
              <span>AI Content Generation</span>
            </div>
            <div className='flex items-center space-x-2 text-xs text-purple-600'>
              <Target className='w-3 h-3' />
              <span>Intelligent Targeting</span>
            </div>
          </div>
        </div>
      </SidebarContent>

      <SidebarFooter className='border-t border-border px-3 py-3 bg-background'>
        {/* User Profile Dropdown */}
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='w-full flex items-center justify-between p-3 rounded-lg bg-linear-to-r from-blue-50 to-purple-50 border border-blue-100 hover:border-purple-200 transition-all duration-200'>
                  <div className='flex items-center space-x-3'>
                    <div className='w-8 h-8 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shrink-0'>
                      <span className='text-white text-sm font-semibold'>
                        {firstLetter}
                      </span>
                    </div>
                    <div className='flex-1 min-w-0 text-left'>
                      <p className='text-sm font-medium text-gray-800 truncate'>
                        {capitalizeFullName(fullName)}
                      </p>
                      <p className='text-xs text-purple-600 truncate flex items-center'>
                        <Sparkles className='w-3 h-3 mr-1' />
                        AI Pro Plan
                      </p>
                    </div>
                  </div>
                  <ChevronUp className='w-4 h-4 text-gray-500' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side='top'
                align='end'
                className='w-56'
                sideOffset={8}
              >
                {/* <DropdownMenuItem asChild>
                  <Link
                    href='/profile'
                    className='flex items-center cursor-pointer'
                  >
                    <User className='w-4 h-4 mr-2' />
                    <span>Profile Settings</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href='/settings'
                    className='flex items-center cursor-pointer'
                  >
                    <Settings className='w-4 h-4 mr-2' />
                    <span>Account Settings</span>
                  </Link>
                </DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                <DropdownMenuItem
                  className='text-red-600 focus:text-red-600  focus:bg-red-50 cursor-pointer'
                  onClick={logout}
                >
                  <LogOut className='w-4 h-4 mr-2' />
                  <span className='text-red-600'>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
