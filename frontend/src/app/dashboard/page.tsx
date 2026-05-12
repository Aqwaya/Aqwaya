import { AICampaignBuilder } from '@/features/campaign/components/AICampaignBuilder';
import { RecentCampaigns } from '@/features/campaign/components/RecentCampaigns';
import { DashboardChannels } from '@/features/dashboard/components/DashboardChannels';
import { DashboardHeader } from '@/features/dashboard/components/DashboardHeader';
import { DashboardStats } from '@/features/dashboard/components/DashboardStats';

export default function page() {
  return (
    <div className='space-y-6 p-4'>
      <DashboardHeader />
      <DashboardStats />
      <AICampaignBuilder />
      <DashboardChannels />
      <RecentCampaigns />
    </div>
  );
}
