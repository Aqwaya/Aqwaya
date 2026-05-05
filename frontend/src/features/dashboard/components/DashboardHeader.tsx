'use client';

import Link from 'next/link';
import { Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUser } from '@/features/auth/hooks/useUser';
import { Spinner } from '@/components/ui/spinner';

export function DashboardHeader() {
  const { user, isLoading } = useUser();

  return (
    <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4'>
      <div>
        <h1 className='text-2xl sm:text-3xl font-bold text-foreground/90 flex items-center'>
          Welcome back,{' '}
          {isLoading ? <Spinner className='size-5' /> : user?.firstName}!
        </h1>
        <p className='text-sm sm:text-base text-gray-600 mt-1'>
          Here's what's happening with your marketing campaigns.
        </p>
      </div>
      <Button
        className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 whitespace-nowrap shrink-0 px-4 w-fit'
        asChild
      >
        <Link
          href='/dashboard/ai-campaign-builder'
          className='flex items-center justify-center'
        >
          <Zap className='w-4 h-4 mr-2' />
          Create with AI
        </Link>
      </Button>
    </div>
  );
}
