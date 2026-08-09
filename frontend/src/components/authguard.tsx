'use client';

import { ReactNode, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      router.replace('/auth/login');
      return;
    }

    setIsChecking(false);
  }, [router]);

  if (isChecking) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='h-16 w-16 animate-spin rounded-full border-b-4 border-blue-600' />
      </div>
    );
  }

  return <>{children}</>;
}
