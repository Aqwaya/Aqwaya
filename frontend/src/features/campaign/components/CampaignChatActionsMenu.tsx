"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  EllipsisVertical,
  Pen,
  Pin,
  PinOff,
  Trash2,
} from "lucide-react";

import { ConfirmDelete } from "@/components/ConfirmDelete";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  useDeleteCampaign,
  useUpdateCampaign,
} from "../hooks/useCampaign";

import { CampaignRenameChatDialog } from "./CampaignRenameChatDialog";

type CampaignChatActionsMenuProps = {
  campaignId: string;
  isPinned: boolean;
  onTogglePin: () => void;
  title: string;
  className?: string;
};

export function CampaignChatActionsMenu({
  campaignId,
  isPinned,
  onTogglePin,
  title,
  className,
}: CampaignChatActionsMenuProps) {
  const router = useRouter();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openRenameDialog, setOpenRenameDialog] = useState(false);

  const {
    mutate: deleteCampaign,
    isPending: isDeleting,
  } = useDeleteCampaign();

  const {
    mutate: updateCampaign,
    isPending: isUpdating,
  } = useUpdateCampaign();

  const handleRename = (newTitle: string) => {
    updateCampaign(
      {
        id: campaignId,
        name: newTitle,
      },
      {
        onSuccess: () => {
          setOpenRenameDialog(false);
        },
      },
    );
  };

  const handleDelete = () => {
    deleteCampaign(campaignId, {
      onSuccess: () => {
        setOpenDeleteDialog(false);
        router.push("/ai-campaign-builder");
      },
    });
  };

  return (
    <>
      <div className="flex shrink-0 items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              type="button"
              variant="ghost"
              size="icon-sm"
              aria-label="More campaign actions"
              className={className}
            >
              <EllipsisVertical className="size-5" />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onSelect={onTogglePin}>
              {isPinned ? (
                <PinOff className="size-4" />
              ) : (
                <Pin className="size-4" />
              )}

              <span>{isPinned ? "Unpin campaign" : "Pin campaign"}</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              disabled={isUpdating}
              onSelect={() => setOpenRenameDialog(true)}
            >
              <Pen className="size-4" />
              <span>Rename campaign</span>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              variant="destructive"
              disabled={isDeleting}
              onSelect={() => setOpenDeleteDialog(true)}
            >
              <Trash2 className="size-4" />
              <span>Delete campaign</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <ConfirmDelete
        open={openDeleteDialog}
        onOpenChange={setOpenDeleteDialog}
        onConfirm={handleDelete}
        resourceName="campaign"
      />

      <CampaignRenameChatDialog
        open={openRenameDialog}
        onOpenChange={setOpenRenameDialog}
        initialTitle={title}
        onRename={handleRename}
        isPending={isUpdating}
      />
    </>
  );
}