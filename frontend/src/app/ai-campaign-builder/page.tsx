import { Button } from '@/components/ui/button';
import { Sparkles, Stars } from 'lucide-react';
import Link from 'next/link';

export default function Page() {
  return (
    <section className='flex h-full min-h-0 items-center justify-center overflow-hidden px-4 py-8'>
      <div className='flex w-full max-w-2xl flex-col items-center text-center'>
        <div className='mb-6 flex size-16 items-center justify-center rounded-md bg-gray-50  text-gray-900'>
          <Sparkles className='size-8' aria-hidden='true' />
        </div>

        <h1 className='text-3xl font-semibold tracking-tight text-foreground sm:text-4xl'>
          AI Campaign Builder
        </h1>

        <p className='mt-4 max-w-xl text-sm sm:text-base leading-7 text-muted-foreground'>
          Have a conversation with your AI business strategist. It will ask the
          right questions and build you a complete sales system &mdash; a page,
          email follow-ups, and WhatsApp messages.
        </p>

        <Button
          className='mt-8 py-5 px-8 text-sm font-semibold bg-gray-900 hover:bg-gray-800'
          asChild
          // onClick={() => router.push('/ai-campaign/1')}
        >
          <Link href='/ai-campaign-builder/1'>
            <Stars />
            Start a new campaign
          </Link>
        </Button>
      </div>
    </section>
  );
}
