"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  LoaderCircle,
  PenBoxIcon,
  Search,
  MoreHorizontal,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil } from "lucide-react";

import {
  useCampaigns,
  useDeleteCampaign,
  useUpdateCampaign,
} from "../hooks/useCampaign";
import Link from "next/link";
import type { CampaignChat } from "../types";
import { Logo } from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { CampaignSearchChatsDialog } from "./CampaignSearchChatsDialog";

export function CampaignChatsPanel() {
  const router = useRouter();

  const [pinnedCampaignIds, setPinnedCampaignIds] = useState<string[]>([]);

  const { data: campaigns = [], isLoading, isError } = useCampaigns();

  const { mutate: updateCampaign, isPending: isUpdating } = useUpdateCampaign();

  const handleEdit = (campaignId: string, currentName: string) => {
    const newName = window.prompt("Enter the new campaign name:", currentName);

    if (!newName || !newName.trim()) return;

    if (newName.trim() === currentName) return;

    updateCampaign({
      id: campaignId,
      name: newName.trim(),
    });
  };

  const { mutate: deleteCampaign, isPending: isDeleting } = useDeleteCampaign();

  // Load pinned campaigns from local storage
  useEffect(() => {
    const savedPins = localStorage.getItem("pinnedCampaignIds");

    if (savedPins) {
      try {
        const parsed: unknown = JSON.parse(savedPins);

        if (
          Array.isArray(parsed) &&
          parsed.every((id): id is string => typeof id === "string")
        ) {
          setPinnedCampaignIds(parsed);
        }
      } catch {
        setPinnedCampaignIds([]);
      }
    }
  }, []);

  const togglePin = (campaignId: string) => {
    setPinnedCampaignIds((previous) => {
      const updated = previous.includes(campaignId)
        ? previous.filter((id) => id !== campaignId)
        : [...previous, campaignId];

      localStorage.setItem("pinnedCampaignIds", JSON.stringify(updated));

      return updated;
    });
  };

  // Put pinned campaigns first
  const sortedCampaigns = useMemo(() => {
    return [...campaigns].sort((a, b) => {
      const aPinned = pinnedCampaignIds.includes(String(a.id));
      const bPinned = pinnedCampaignIds.includes(String(b.id));

      return Number(bPinned) - Number(aPinned);
    });
  }, [campaigns, pinnedCampaignIds]);

  // Prepare data for search
  const campaignChats: CampaignChat[] = campaigns.map((campaign) => ({
    id: String(campaign.id ?? ""),
    title: campaign.name,
    status:
      campaign.status.toLowerCase() === "completed"
        ? "completed"
        : "in-progress",
    time: campaign.lastActive || campaign.created || "",
    pinned: pinnedCampaignIds.includes(String(campaign.id)),
  }));

  const handleDelete = (campaignId: string, campaignName: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${campaignName}"?`,
    );

    if (!confirmed) return;

    deleteCampaign(campaignId, {
      onSuccess: () => {
        if (activeCampaignId === campaignId) {
          router.push("/ai-campaign-builder");
        }
      },
    });
  };

  const params = useParams<{ id?: string }>();

  const [openSearchDialog, setOpenSearchDialog] = useState(false);

  const activeCampaignId =
    typeof params.id === "string" ? params.id : undefined;

  return (
    <Sidebar
      collapsible="icon"
      className="border-r border-border bg-background"
    >
      {/* Header */}
      <SidebarHeader className="border-b border-border/70 bg-background p-0">
        <div className="flex items-center justify-between gap-2 border-b border-border/70 px-3 py-3 group-data-[collapsible=icon]:justify-center">
          <div className="flex min-w-0 items-center gap-2 group-data-[collapsible=icon]:hidden">
            <Logo className="shrink-0" />

            <div className="min-w-0">
              <p className="truncate text-sm font-bold leading-tight text-foreground">
                Aqwaya.ai
              </p>

              <p className="truncate text-xs text-muted-foreground">
                Campaign Builder
              </p>
            </div>
          </div>

          <SidebarTrigger className="hidden shrink-0 text-foreground hover:bg-muted hover:text-foreground md:flex" />
        </div>

        {/* New Chat and Search */}
        <SidebarMenu className="gap-1 p-2">
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="New chat"
              className="
                h-11!
                rounded-xl!
                bg-slate-900!
                text-white!
                shadow-sm!
                transition-all
                duration-200
                hover:bg-slate-800!
                hover:text-white!
                active:bg-slate-800!
                active:text-white!
                group-data-[collapsible=icon]:justify-center!
              "
            >
              <Link href="/ai-campaign-builder">
                <PenBoxIcon className="size-4.5 shrink-0 text-white" />

                <span className="font-medium group-data-[collapsible=icon]:hidden">
                  New chat
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              tooltip="Search chats"
              className="h-10! justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center"
              onClick={() => setOpenSearchDialog(true)}
            >
              <Search className="size-4 shrink-0" />

              <span className="group-data-[collapsible=icon]:hidden">
                Search chats
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <CampaignSearchChatsDialog
          open={openSearchDialog}
          onOpenChange={setOpenSearchDialog}
          chats={campaignChats}
          onSelect={(campaignId) => {
            router.push(`/ai-campaign-builder/${campaignId}`);
          }}
        />
      </SidebarHeader>

      {/* Campaign History */}
      <SidebarContent className="bg-background px-2 py-3">
        <SidebarGroup className="p-0 group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel className="mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your Campaigns
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {/* Loading */}
              {isLoading && (
                <SidebarMenuItem>
                  <div className="flex items-center gap-2 px-2 py-3 text-sm text-muted-foreground">
                    <LoaderCircle className="size-4 animate-spin" />
                    Loading campaigns...
                  </div>
                </SidebarMenuItem>
              )}

              {/* Error */}
              {isError && (
                <SidebarMenuItem>
                  <div className="px-2 py-3 text-sm text-destructive">
                    Failed to load campaigns.
                    <button
                      type="button"
                      onClick={() => window.location.reload()}
                      className="ml-1 underline underline-offset-2"
                    >
                      Retry
                    </button>
                  </div>
                </SidebarMenuItem>
              )}

              {/* Campaign list */}
              {!isLoading &&
                !isError &&
                sortedCampaigns.map((campaign) => {
                  const isActive = String(campaign.id) === activeCampaignId;

                  return (
                    <SidebarMenuItem key={campaign.id}>
                      <div className="flex w-full items-center gap-1">
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          tooltip={campaign.name}
                          className="h-10 min-w-0 flex-1 justify-start rounded-lg"
                        >
                          <Link href={`/ai-campaign-builder/${campaign.id}`}>
                            <span className="min-w-0 truncate">
                              {campaign.name}
                            </span>
                          </Link>
                        </SidebarMenuButton>

                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <button
                              type="button"
                              aria-label={`Actions for ${campaign.name}`}
                              className="flex size-8 shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
                            >
                              <MoreHorizontal className="size-4" />
                            </button>
                          </DropdownMenuTrigger>

                          <DropdownMenuContent align="end" className="w-44">
                            <DropdownMenuItem
                              onSelect={() => togglePin(String(campaign.id))}
                            >
                              {pinnedCampaignIds.includes(
                                String(campaign.id),
                              ) ? (
                                <>
                                  <PinOff className="mr-2 size-4" />
                                  Unpin campaign
                                </>
                              ) : (
                                <>
                                  <Pin className="mr-2 size-4" />
                                  Pin campaign
                                </>
                              )}
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              disabled={isUpdating}
                              onSelect={() =>
                                handleEdit(String(campaign.id), campaign.name)
                              }
                            >
                              <Pencil className="mr-2 size-4" />
                              Rename campaign
                            </DropdownMenuItem>

                            <DropdownMenuSeparator />

                            <DropdownMenuItem
                              disabled={isDeleting}
                              onSelect={() =>
                                handleDelete(String(campaign.id), campaign.name)
                              }
                              className="text-destructive focus:text-destructive"
                            >
                              <Trash2 className="mr-2 size-4" />
                              Delete campaign
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </SidebarMenuItem>
                  );
                })}

              {/* Empty state */}
              {!isLoading && !isError && campaigns.length === 0 && (
                <SidebarMenuItem>
                  <div className="px-2 py-4 text-sm text-muted-foreground">
                    No campaigns yet. Create your first campaign to get started.
                  </div>
                </SidebarMenuItem>
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer */}
      <SidebarFooter className="border-t border-border/70 bg-background p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              tooltip="Back to dashboard"
              className="h-10 justify-start text-foreground hover:bg-muted hover:text-foreground group-data-[collapsible=icon]:justify-center"
            >
              <Link href="/dashboard">
                <ArrowLeft className="size-4 shrink-0" />

                <span className="group-data-[collapsible=icon]:hidden">
                  Back to dashboard
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  );
}
