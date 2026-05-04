import { Globe, Mail, MessageSquare } from 'lucide-react';
import { Channel } from '../types';

export const channels: Channel[] = [
  {
    id: 'landing-page',
    title: 'AI Landing Page Builder',
    description:
      'Create high-converting landing pages with AI assistance for lead generation and sales',
    icon: Globe,
    gradient: 'from-orange-500 to-red-500',
    hoverBorder: 'hover:border-orange-200',
    href: '/dashboard/landing-page-builder',
  },
  {
    id: 'email',
    title: 'AI Email Marketing',
    description: 'Design and send AI-powered email campaigns that convert',
    icon: Mail,
    gradient: 'from-green-500 to-emerald-500',
    hoverBorder: 'hover:border-green-200',
    href: '/dashboard/email-marketing',
  },
  {
    id: 'sms-whatsapp',
    title: 'AI SMS & WhatsApp',
    description:
      'Reach customers instantly with AI-crafted text and WhatsApp campaigns',
    icon: MessageSquare,
    gradient: 'from-purple-500 to-pink-500',
    hoverBorder: 'hover:border-purple-300',
    href: '/dashboard/sms-whatsapp',
  },
];
