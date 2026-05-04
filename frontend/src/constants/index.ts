import { NavLink } from '@/types';
import {
  BarChart3,
  Bot,
  Globe,
  LayoutDashboard,
  MessageSquare,
  Settings,
  Target,
  Users,
  Zap,
} from 'lucide-react';

export const navLinks: NavLink[] = [
  {
    label: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    label: 'AI Campaign Builder',
    href: '/dashboard/ai-campaign-builder',
    icon: Zap,
  },
  {
    label: 'Campaigns',
    href: '/dashboard/campaigns',
    icon: Target,
  },
  {
    label: 'Landing Pages',
    href: '/dashboard/landing-pages',
    icon: Globe,
  },
  { label: 'Leads', href: '/dashboard/leads', icon: Users },
  {
    label: 'AI Email Marketing',
    href: '/dashboard/ai-email-marketing',
    icon: Bot,
    isAI: true,
  },
  {
    label: 'SMS & WhatsApp',
    href: '/dashboard/sms',
    icon: MessageSquare,
  },
  {
    label: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
  },
  {
    label: 'Settings',
    href: '/dashboard/settings',
    icon: Settings,
  },
];
