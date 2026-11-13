import axios from "axios";
import { api } from "@/lib/axios";
import { Campaign } from "@/types/campaign";

// Create a new campaign
export async function createCampaign(name: string) {
  try {
    const response = await api.post<Campaign>("/campaigns", {
      name,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("CREATE CAMPAIGN ERROR:", error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to create campaign",
      );
    }

    throw error;
  }
}

// Fetch all campaigns
export async function getCampaigns() {
  try {
    const response = await api.get<Campaign[]>("/campaigns");

    return response.data;
  } catch (error: unknown) {
    console.error("GET CAMPAIGNS ERROR:", error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch campaigns",
      );
    }

    throw error;
  }
}

// Fetch one campaign by ID
export async function getCampaign(id: string) {
  try {
    const response = await api.get<Campaign>(`/campaigns/${id}`);

    return response.data;
  } catch (error: unknown) {
    console.error("GET CAMPAIGN ERROR:", error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to fetch campaign",
      );
    }

    throw error;
  }
}

//update a campaign
export async function updateCampaign(id: string, name: string) {
  try {
    const response = await api.patch<Campaign>(`/campaigns/${id}`, {
      name,
    });

    return response.data;
  } catch (error: unknown) {
    console.error("UPDATE CAMPAIGN ERROR:", error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to update campaign",
      );
    }

    throw error;
  }
}

// Delete a campaign
export async function deleteCampaign(id: string) {
  try {
    const response = await api.delete(`/campaigns/${id}`);

    return response.data;
  } catch (error: unknown) {
    console.error("DELETE CAMPAIGN ERROR:", error);

    if (axios.isAxiosError(error)) {
      throw new Error(
        error.response?.data?.error ||
          error.response?.data?.message ||
          "Failed to delete campaign",
      );
    }

    throw error;
  }
}
