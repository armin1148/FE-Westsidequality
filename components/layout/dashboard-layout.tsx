"use client";

import { ReactNode } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./topbar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => (
  <div className="min-h-screen bg-gray-50">
    <Sidebar />
    <TopBar />

    <main className="ml-64 pt-16">
      <div className="p-6">{children}</div>
    </main>
  </div>
);
