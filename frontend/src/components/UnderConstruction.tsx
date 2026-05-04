'use client';

import { Wrench } from 'lucide-react';

export function UnderConstruction() {
  return (
    <div className='flex h-dvh md:h-[80vh] flex-col items-center justify-center  text-center'>
      <div className='flex flex-col items-center gap-4'>
        <div className='rounded-full bg-muted p-4'>
          <Wrench className='h-10 w-10 text-foreground/80' />
        </div>

        <h1 className='text-2xl font-semibold text-foreground'>
          Page Under Construction
        </h1>

        <p className='max-w-md text-sm text-muted-foreground'>
          This page is currently being worked on. Please check back later.
        </p>
      </div>
    </div>
  );
}
