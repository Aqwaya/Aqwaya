'use client';

import { AICampaignBuilder } from '@/features/campaign/components/AICampaignBuilder';
import { RecentCampaigns } from '@/features/campaign/components/RecentCampaigns';
import { DashboardChannels } from '@/features/dashboard/components/DashboardChannels';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function page() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (!user || !token) router.push('/auth/login');
  }, [router]);
  return (
    <div className='space-y-6'>
      <DashboardHeader />
      <DashboardStats />
      <AICampaignBuilder />
      <DashboardChannels />
      <RecentCampaigns />
    </div>
  );
}
