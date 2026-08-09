'use client';

import { Logo } from '@/components/Logo';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AuthTabs } from '@/features/auth/components/AuthTabs';
import { SignupForm } from '@/features/auth/components/SignupForm';
import { SocialLogin } from '@/features/auth/components/SocialLogin';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function page() {
  const router = useRouter();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    if (user && token) {
      router.replace('/dashboard');
      return;
    }

    setIsCheckingAuth(false);
  }, [router]);

  if (isCheckingAuth) {
    return (
      <div className='flex h-dvh items-center justify-center'>
        <div className='h-16 w-16 animate-spin rounded-full border-b-4 border-blue-600' />
      </div>
    );
  }
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
