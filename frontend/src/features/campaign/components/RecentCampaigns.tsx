import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import Link from 'next/link';

const recentCampaigns = [
  {
    id: 1,
    name: 'Summer Sale Landing Page',
    type: 'Lead Generation',
    status: 'Active',
    leads: 127,
    conversion: '8.3%',
  },
  {
    id: 2,
    name: 'Product Launch Email Series',
    type: 'Email Marketing',
    status: 'Active',
    leads: 89,
    conversion: '12.1%',
  },
  {
    id: 3,
    name: 'WhatsApp Follow-up Flow',
    type: 'SMS/WhatsApp',
    status: 'Draft',
    leads: 0,
    conversion: '0%',
  },
];

export function RecentCampaigns() {
  return (
    <Card>
      <CardHeader className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3'>
        <CardTitle className='text-xl'>Recent Campaigns</CardTitle>
        <Button variant='outline' className='w-full sm:w-auto' asChild>
          <Link href='/dashboard/campaigns'>View All</Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className='space-y-4'>
          {recentCampaigns.map((campaign) => (
            <div
              key={campaign.id}
              className='flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-lg hover:bg-gray-50 transition-colors'
            >
              <div className='flex items-center space-x-4'>
                <div className='w-10 h-10 bg-linear-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shrink-0'>
                  <Target className='w-5 h-5 text-white' />
                </div>
                <div className='min-w-0'>
                  <h3 className='font-semibold text-gray-900 truncate'>
                    {campaign.name}
                  </h3>
                  <p className='text-sm text-gray-600'>{campaign.type}</p>
                </div>
              </div>
              <div className='flex items-center justify-between sm:justify-end sm:space-x-6 text-sm'>
                <div className='text-center'>
                  <p className='font-semibold text-gray-900'>
                    {campaign.leads}
                  </p>
                  <p className='text-gray-600'>Leads</p>
                </div>
                <div className='text-center'>
                  <p className='font-semibold text-gray-900'>
                    {campaign.conversion}
                  </p>
                  <p className='text-gray-600'>Conversion</p>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${
                    campaign.status === 'Active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {campaign.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
