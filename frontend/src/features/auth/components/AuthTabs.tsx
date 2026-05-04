'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const tabs = [
  { label: 'Sign In', href: '/auth/login' },
  { label: 'Sign Up', href: '/auth/register' },
];

export function AuthTabs() {
  const pathname = usePathname();

  return (
    <div className='flex mb-6 border rounded-lg overflow-hidden bg-gray-100 p-1'>
      {tabs.map(({ label, href }) => (
        <Link
          key={href}
          href={href}
          className={`flex-1 px-4 py-2 font-medium text-center rounded-md transition-colors ${
            pathname === href
              ? 'bg-background text-foreground shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          {label}
        </Link>
      ))}
    </div>
  );
}
