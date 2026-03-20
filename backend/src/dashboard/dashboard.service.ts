import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardSummaryDto, DashboardIcon } from './dto/dashboard-summary.dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getSummary(userId: string): Promise<DashboardSummaryDto> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: { profile: true },
    });

    return {
      stats: [
        { 
          title: 'Total Leads', 
          value: '0', 
          change: '+0%', 
          icon: DashboardIcon.USERS, 
          color: 'text-blue-600' 
        },
        { 
          title: 'Email Sent', 
          value: '0', 
          change: '+0%', 
          icon: DashboardIcon.MAIL, 
          color: 'text-green-600' 
        },
        { 
          title: 'Messages', 
          value: '0', 
          change: '+0%', 
          icon: DashboardIcon.MESSAGE, 
          color: 'text-purple-600' 
        },
        { 
          title: 'Revenue', 
          value: '$0', 
          change: '+0%', 
          icon: DashboardIcon.DOLLAR, 
          color: 'text-emerald-600' 
        },
      ],
      recentCampaigns: [],
      userName: user?.firstName || user?.email.split('@')[0] || 'User',
      businessName: user?.profile?.businessName || 'Your Business'
    };
  }
}