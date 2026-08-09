'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { Logo } from '@/components/Logo';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { AuthTabs } from '../../../features/auth/components/AuthTabs';
import { LoginForm } from '../../../features/auth/components/LoginForm';

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
            Welcome to Aqwaya
          </CardTitle>
          <p className='text-sm text-muted-foreground'>
            Sign in to your account or create a new one
          </p>
        </CardHeader>
        <CardContent>
          <AuthTabs />
          <LoginForm />
          {/* <SocialLogin /> */}
        </CardContent>
      </Card>
    </div>
  );
}
