export interface CampaignChat {
  id: string;
  title: string;
  status: "completed" | "in-progress";
  time: string;
  pinned: boolean;
}
