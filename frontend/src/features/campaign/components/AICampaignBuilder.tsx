import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Zap } from 'lucide-react';
import Link from 'next/link';

export function AICampaignBuilder() {
  return (
    <Link href='/dashboard/ai-campaign-builder' className='block'>
      <Card className='bg-linear-to-r from-blue-50 to-purple-50 border-2 border-blue-200 transition-all duration-200 hover:border-primary/60 hover:shadow-md'>
        <CardHeader className='text-center pb-4'>
          <div className='mx-auto w-16 h-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-4'>
            <Zap className='w-8 h-8 text-white' />
          </div>
          <CardTitle className='text-2xl mb-2'>AI Campaign Builder</CardTitle>
          <p className='text-lg text-gray-600'>
            Generate leads, nurture leads, make sales
          </p>
        </CardHeader>
        <CardContent className='text-center'>
          <p className='text-gray-600 mb-6'>
            Let AI create your complete marketing strategy and implement it
            across all channels automatically
          </p>
          <Button
            size='lg'
            className='bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 px-4'
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
}
