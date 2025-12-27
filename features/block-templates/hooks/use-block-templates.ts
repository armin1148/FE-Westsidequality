import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { DialogType, useDialog } from "@/context/dialog-context";

import {
  setSelectedBlockTemplate,
  deleteBlockTemplate,
  selectBlockTemplatesState,
} from "@/store/features/block-templates";
import type { BlockTemplateEntity } from "../types";
import { useApp } from "@/context/app-context";

export const useBlockTemplates = () => {
  const { dispatch } = useApp();
  const { openDialog } = useDialog();
  const {
    blockTemplates,
    blockTemplateOptions,
    loading,
    error,
    selectedBlockTemplate,
  } = useAppSelector(selectBlockTemplatesState);

  // Delete dialog
  const openDeleteDialog = useCallback(
    (blockTemplate: BlockTemplateEntity) => {
      openDialog({
        type: DialogType.CONFIRM,
        title: "Delete Block Template",
        description: `Are you sure you want to delete ${blockTemplate.name} template?`,
        onConfirm: () =>
          dispatch(deleteBlockTemplate({ id: blockTemplate.id })),
      });
    },
    [dispatch, openDialog]
  );

  // Edit dialog
  const openEditDialog = useCallback(
    (blockTemplate: BlockTemplateEntity) => {
      dispatch(setSelectedBlockTemplate(blockTemplate));
      openDialog({
        type: DialogType.EDIT_BLOCK_TEMPLATE,
        title: "Edit Block Template",
        description: "",
      });
    },
    [dispatch, openDialog]
  );

  return {
    blockTemplates,
    blockTemplateOptions,
    selectedBlockTemplate,
    loading,
    error,
    openEditDialog,
    openDeleteDialog,
  };
};
