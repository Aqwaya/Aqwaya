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

  useEffect(() => {
    const stored = localStorage.getItem('user');
    if (stored) setUser(JSON.parse(stored));
    else router.replace('/auth/login');
  }, []);

  return { user, setUser };
}
