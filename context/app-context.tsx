"use client";
import { fetchAllBlockTypes } from "@/store/features/block-types";
import { fetchAllBlockTemplates } from "@/store/features/block-templates";
import { fetchAllPages } from "@/store/features/pages";
import { useAppDispatch } from "@/store/hook";
import { AppDispatch, store } from "@/store/store";
import { createContext, useContext, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

const AppContext = createContext<AppContextType | null>(null);

interface AppContextType {
  dispatch: AppDispatch;
}

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const { data: session } = useSession();
  useEffect(() => {
    if (pathname.startsWith("/admin") && session) {
      dispatch(fetchAllBlockTypes());
      dispatch(fetchAllBlockTemplates());
      dispatch(fetchAllPages());
    }
  }, [dispatch, pathname, session]);
  return (
    <AppContext.Provider value={{ dispatch: store.dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
};
