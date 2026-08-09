import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

type ConfirmDeleteProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: VoidFunction;
  resourceName: string;
};

export function ConfirmDelete({
  open,
  onOpenChange,
  onConfirm,
  resourceName,
}: ConfirmDeleteProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {resourceName}</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this {resourceName}? This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='px-4'>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className='px-4 bg-destructive hover:bg-destructive/90 focus-visible:border-destructive/40 focus-visible:ring-destructive/20'
            onClick={onConfirm}
          >
            Delete chat
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
