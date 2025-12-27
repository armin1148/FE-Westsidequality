"use client";

import { createContext, useContext, useState } from "react";

export enum DialogType {
  CONFIRM = "CONFIRM",
  CREATE_BLOCK_TYPE = "CREATE_BLOCK_TYPE",
  EDIT_BLOCK_TYPE = "EDIT_BLOCK_TYPE",
  CREATE_BLOCK_TEMPLATE = "CREATE_BLOCK_TEMPLATE",
  EDIT_BLOCK_TEMPLATE = "EDIT_BLOCK_TEMPLATE",
  CREATE_PAGE = "CREATE_PAGE",
}

interface DialogConfig {
  id?: string;
  type: DialogType;
  title: string;
  description: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface DialogContextType {
  openDialog: (config: DialogConfig) => void;
  closeDialog: () => void;
  currentDialog: DialogConfig | null;
}

const DialogContext = createContext<DialogContextType | null>(null);

export const DialogProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentDialog, setCurrentDialog] = useState<DialogConfig | null>(null);

  const openDialog = (config: DialogConfig) => {
    setCurrentDialog({ ...config });
  };

  const closeDialog = () => {
    setCurrentDialog(null);
  };

  return (
    <DialogContext.Provider value={{ openDialog, closeDialog, currentDialog }}>
      {children}
    </DialogContext.Provider>
  );
};

export const useDialog = () => {
  const ctx = useContext(DialogContext);
  if (!ctx) {
    throw new Error("useDialog must be used inside DialogProvider");
  }
  return ctx;
};
