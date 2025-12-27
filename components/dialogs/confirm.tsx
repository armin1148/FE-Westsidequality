"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogType, useDialog } from "@/context/dialog-context";

const ConfirmDialog = () => {
  const { currentDialog, closeDialog } = useDialog();

  if (!currentDialog || currentDialog.type !== DialogType.CONFIRM) return null;

  const handleConfirm = () => {
    currentDialog.onConfirm?.();
    closeDialog();
  };

  const handleCancel = () => {
    currentDialog.onCancel?.();
    closeDialog();
  };

  return (
    <Dialog open={!!currentDialog} onOpenChange={closeDialog}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{currentDialog.title}</DialogTitle>
          <DialogDescription>{currentDialog.description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleConfirm}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDialog;
