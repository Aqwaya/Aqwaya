'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

function formatSegment(segment: string) {
  return segment
    .split('-')
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export function DashboardBreadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const dashboardIndex = segments.indexOf('dashboard');
  const dashboardSegments =
    dashboardIndex === -1 ? segments : segments.slice(dashboardIndex);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {dashboardSegments.map((segment, index) => {
          const href = `/${dashboardSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === dashboardSegments.length - 1;
          const label = formatSegment(segment);

          return (
            <Fragment key={href}>
              {index > 0 && <BreadcrumbSeparator />}

              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
