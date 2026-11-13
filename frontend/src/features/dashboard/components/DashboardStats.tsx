import { Card, CardContent } from '@/components/ui/card';
import { DollarSign, Mail, MessageSquare, Users } from 'lucide-react';

const stats = [
  {
    title: 'Total Leads',
    value: '2,847',
    change: '+12.5%',
    icon: Users,
    color: 'text-blue-600',
  },
  {
    title: 'Email Opens',
    value: '68.3%',
    change: '+5.2%',
    icon: Mail,
    color: 'text-green-600',
  },
  {
    title: 'SMS Response Rate',
    value: '24.1%',
    change: '+8.1%',
    icon: MessageSquare,
    color: 'text-purple-600',
  },
  {
    title: 'Revenue',
    value: '$12,847',
    change: '+18.7%',
    icon: DollarSign,
    color: 'text-emerald-600',
  },
];

export function DashboardStats() {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6'>
      {stats.map((stat, index) => (
        <Card
          key={index}
          className='border border-border ring-0 shadow-none hover:border-primary/60 hover:shadow-md'
        >
          <CardContent className=''>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600'>
                  {stat.title}
                </p>
                <p className='text-2xl font-bold text-foreground/90 mt-1'>
                  {stat.value}
                </p>
                <p className='text-sm text-green-600 mt-1'>{stat.change}</p>
              </div>
              <div className={`p-3 rounded-full bg-gray-50 ${stat.color}`}>
                <stat.icon className='w-6 h-6' />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
