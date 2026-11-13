'use client';

import { Logo } from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { VerifyEmailForm } from '@/features/auth/components/VerifyEmailForm';

export default function page() {
  return (
    <div className='h-dvh flex items-center justify-center bg-gray-50 p-2'>
      <Card className='w-full max-w-sm sm:max-w-md shadow-lg border-0'>
        <CardHeader className='flex flex-col items-center'>
          <Logo />
          <CardTitle className='mt-4 text-2xl font-bold'>
            Verify your email
          </CardTitle>
          <p className='text-sm text-muted-foreground text-center'>
            Please enter the 6-digit verification code that was sent to your
            email
          </p>
          {/* <p className='text-sm text-muted-foreground text-center'>
            We sent a 6-digit code to{' '}
            <span className='text-foreground font-medium'>j***@gmail.com</span>
          </p> */}
        </CardHeader>
        <CardContent>
          <VerifyEmailForm />
        </CardContent>
      </Card>
    </div>
  );
}
