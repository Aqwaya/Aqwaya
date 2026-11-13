import Image from 'next/image';
import { ComponentProps } from 'react';

export function Logo({ className }: ComponentProps<'div'>) {
  return (
    <Image
      src='/logo.png'
      alt='Logo'
      className={className}
      width={60}
      height={60}
    />
  );
}
