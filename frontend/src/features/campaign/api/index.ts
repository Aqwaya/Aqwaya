import { api } from '@/lib/axios';
import axios from 'axios';

export async function getCampaigns() {
  try {
    const campaigns = await api.get(`/campaigns`);

    console.log(campaigns);

    return campaigns.data;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch campaigns');
    }
    throw error;
  }
}
export async function getCampaign(id: string) {
  try {
    const campaigns = await api.get(`/api/v1/campaigns/${id}`);
    return campaigns.data;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Failed to fetch campaign');
    }
    throw error;
  }
}
export async function deleteCampaign(id: string) {
  try {
    const campaigns = await api.delete(`/api/v1/campaigns/${id}`);
    return campaigns.data;
  } catch (error: unknown) {
    console.log(error);
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.error || 'Failed to delete campaign');
    }
    throw error;
  }
}
