'use client';

import { useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { getSession } from '@/lib/auth';

interface AuthGuardProps {
  children: ReactNode;
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = true;
    // const token = localStorage.getItem("token");

    if (!token) {
      router.push('/auth/login'); // redirect if not logged in
    } else {
      setLoading(false); // token exists, show page
    }
  }, [router]);

  if (loading) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600'></div>
      </div>
    );
  }

  return <>{children}</>;
}
