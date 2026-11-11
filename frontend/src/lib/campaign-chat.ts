
import axios from "axios";
import { api } from "@/lib/axios";

export interface CampaignSuggestion {
  label: string;
  value: string;
  action: string;
}

export interface CampaignMessage {
  id: string;
  campaignId: string;
  role: "USER" | "ASSISTANT";
  content: string;
  suggestions: CampaignSuggestion[];
  createdAt: string;
}

export async function getCampaignMessages(campaignId: string) {
  try {
    const response = await api.get<CampaignMessage[]>(
      `/campaigns/${campaignId}/messages`,
    );

    return response.data;
  } catch (error: unknown) {
    console.error("GET CAMPAIGN MESSAGES ERROR:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error ||
          "Failed to fetch campaign messages",
      );
    }

    throw error;
  }
}

export async function sendCampaignMessage(
  campaignId: string,
  content: string,
) {
  try {
    const response = await api.post(
      `/campaigns/${campaignId}/messages`,
      { content },
    );

    return response.data;
  } catch (error: unknown) {
    console.error("SEND CAMPAIGN MESSAGE ERROR:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error ||
          error.response.data?.message ||
          "Failed to send campaign message",
      );
    }

    throw error;
  }
}

export async function generateCampaignResponse(campaignId: string) {
  try {
    const response = await api.post(
      `/campaigns/${campaignId}/generate`,
    );

    return response.data;
  } catch (error: unknown) {
    console.error("GENERATE CAMPAIGN RESPONSE ERROR:", error);

    if (axios.isAxiosError(error) && error.response) {
      throw new Error(
        error.response.data?.error ||
          "Failed to generate campaign response",
      );
    }

    throw error;
  }
}
