'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

import { LoginForm } from '../../../features/auth/components/LoginForm';
import { Logo } from '@/components/Logo';
import { AuthTabs } from '../../../features/auth/components/AuthTabs';
import { SocialLogin } from '@/features/auth/components/SocialLogin';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

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
