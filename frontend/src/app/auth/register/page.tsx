'use client';

import { Logo } from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthTabs } from '@/features/auth/components/AuthTabs';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { SocialLogin } from '@/features/auth/components/SocialLogin';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function page() {
  const router = useRouter();

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    if (user && token) router.push('/dashboard');
  }, [router]);

  return (
    <div className='h-dvh flex items-center justify-center bg-gray-50 p-2'>
      <Card className='w-full max-w-sm sm:max-w-md shadow-lg border-0 '>
        <CardHeader className='flex flex-col items-center'>
          <Logo />
          <CardTitle className='mt-4 text-2xl font-bold'>
            Create an Account
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Sign up to start using Aqwaya
          </p>
        </CardHeader>
        <CardContent>
          <AuthTabs />
          <SignupForm />
          {/* <SocialLogin /> */}
        </CardContent>
      </Card>
    </div>
  );
}
