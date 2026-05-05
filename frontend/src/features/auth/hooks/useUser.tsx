import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface User {
  firstName: string;
  lastName: string;
  role: string;
  isActive: boolean;
  id: string;
  createdAt: Date;
  updatedAt: Date;
}

export function useUser() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('user');
        router.replace('/auth/login');
        return;
      }

      setIsLoading(false);
      return;
    }

    router.replace('/auth/login');
  }, [router]);

  return { user, setUser, isLoading };
}
