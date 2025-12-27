"use client";
import { useApp } from "@/context/app-context";
import { DialogType, useDialog } from "@/context/dialog-context";
import { deletePage, selectPagesState } from "@/store/features/pages";
import { useAppSelector } from "@/store/hook";
import { useCallback } from "react";
import { PageEntity } from "../types";
import { useRouter } from "next/navigation";

export const usePages = () => {
  const { dispatch } = useApp();
  const router = useRouter();
  const { openDialog } = useDialog();
  const { pages, loading, error, selectedPage, loadingDetail, homePageId } =
    useAppSelector(selectPagesState);

  const openDeleteDialog = useCallback(
    (page: PageEntity) => {
      openDialog({
        type: DialogType.CONFIRM,
        title: "Delete Page",
        description: `Are you sure you want to delete ${page.title} page?`,
        onConfirm: () =>
          dispatch(deletePage({ id: page.id })).then(() => {
            router.push("/admin/pages");
          }),
      });
    },
    [dispatch, openDialog]
  );

  return {
    pages,
    loading,
    error,
    selectedPage,
    loadingDetail,
    openDeleteDialog,
    homePageId,
  };
};
