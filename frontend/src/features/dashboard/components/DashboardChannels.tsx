import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { channels } from '../constants';

export function DashboardChannels() {
  return (
    <div>
      <h3 className='text-xl font-semibold text-gray-900 mb-2'>
        Or Choose a Specific Channel
      </h3>
      <p className='text-gray-600 mb-4 text-sm md:text-base'>
        Already know what you want to build? Jump directly into our AI-powered
        channel-specific tools.
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6'>
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Link key={channel.id} href={channel.href}>
              <Card
                className={`hover:shadow-lg transition-all duration-200 border-2 ring-0 ${channel.hoverBorder}`}
              >
                <CardHeader className='text-center'>
                  <div
                    className={`mx-auto w-12 h-12 bg-linear-to-r ${channel.gradient} rounded-full flex items-center justify-center mb-4`}
                  >
                    <Icon className='w-6 h-6 text-white' />
                  </div>
                  <CardTitle className='text-lg'>{channel.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className='text-gray-600 text-center mb-4'>
                    {channel.description}
                  </p>
                  <Button
                    className={`w-full bg-linear-to-r ${channel.gradient} hover:${channel.gradient.replace('500', '600')}`}
                    asChild
                  >
                    <span className='flex items-center justify-center'>
                      Start Building
                      <ArrowRight className='w-4 h-4 ml-2' />
                    </span>
                  </Button>
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
