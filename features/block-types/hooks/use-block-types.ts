import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { DialogType, useDialog } from "@/context/dialog-context";

import {
  setSelectedBlockType,
  deleteBlockType,
  selectBlockTypesState,
} from "@/store/features/block-types";
import type { BlockTypeEntity } from "../types";
import { useApp } from "@/context/app-context";

export const useBlockTypes = () => {
  const { dispatch } = useApp();
  const { openDialog } = useDialog();
  const { blockTypes, blockTypeOptions, loading, error, selectedBlockType } =
    useAppSelector(selectBlockTypesState);

  // Delete dialog
  const openDeleteDialog = useCallback(
    (blockType: BlockTypeEntity) => {
      openDialog({
        type: DialogType.CONFIRM,
        title: "Delete Block Type",
        description: `Are you sure you want to delete ${blockType.code} type?`,
        onConfirm: () => dispatch(deleteBlockType({ id: blockType.id })),
      });
    },
    [dispatch, openDialog]
  );

  // Edit dialog
  const openEditDialog = useCallback(
    (blockType: BlockTypeEntity) => {
      dispatch(setSelectedBlockType(blockType));
      openDialog({
        type: DialogType.EDIT_BLOCK_TYPE,
        title: "Edit Block Type",
        description: "",
      });
    },
    [dispatch, openDialog]
  );

  return {
    blockTypes,
    selectedBlockType,
    blockTypeOptions,
    loading,
    error,
    openEditDialog,
    openDeleteDialog,
  };
};
