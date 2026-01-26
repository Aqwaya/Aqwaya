export interface EmailCampaign {
  id?: string | number;
  name: string;
  type: string;
  status: string;
  description: string;
  targetAudience: string;
  budget: string;
  channels: string[];
  leads: number;
  conversion: string;
  revenue: string;
  created: string;
  lastActive: string;
}
