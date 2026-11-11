
"use client";

import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "aqwaya-pinned-campaigns";
const PIN_EVENT = "aqwaya-pinned-campaigns-changed";

function readPinnedCampaigns(): string[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    return [];
  }
}

export function usePinnedCampaign(campaignId: string) {
  const [pinnedIds, setPinnedIds] = useState<string[]>([]);

  useEffect(() => {
    const syncPins = () => {
      setPinnedIds(readPinnedCampaigns());
    };

    syncPins();

    window.addEventListener(PIN_EVENT, syncPins);

    return () => {
      window.removeEventListener(PIN_EVENT, syncPins);
    };
  }, []);

  const togglePin = useCallback(() => {
    const current = readPinnedCampaigns();

    const updated = current.includes(campaignId)
      ? current.filter((id) => id !== campaignId)
      : [...current, campaignId];

    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setPinnedIds(updated);

    window.dispatchEvent(new Event(PIN_EVENT));
  }, [campaignId]);

  return {
    isPinned: pinnedIds.includes(campaignId),
    togglePin,
  };
}