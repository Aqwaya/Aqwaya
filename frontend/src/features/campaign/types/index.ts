export interface CampaignChat {
  id: string;
  title: string;
  status: 'in-progress' | 'completed';
  time: string;
  pinned?: boolean;
}
