"use client";
import { useApp } from "@/context/app-context";
import PageDetail from "@/features/pages/detail";
import { fetchPageById } from "@/store/features/pages";
import { useEffect } from "react";

const PageDetailPage = ({ params }: { params: { id: string } }) => {
  const pageId = params.id;
  const { dispatch } = useApp();
  useEffect(() => {
    dispatch(fetchPageById({ id: pageId }));
  }, [dispatch, pageId]);
  return <PageDetail />;
};

export default PageDetailPage;
