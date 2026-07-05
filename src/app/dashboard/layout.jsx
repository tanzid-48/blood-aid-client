"use client";

import { useState } from "react";
import { useRequireRole } from "@/hooks/useRequireRole";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isPending, isAuthorized } = useRequireRole([
    "user",
    "volunteer",
    "admin",
  ]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex items-center justify-center">
        <div className="h-10 w-10 rounded-xl bg-red-600 animate-pulse flex items-center justify-center">
          <span className="text-white text-lg">🩸</span>
        </div>
      </div>
    );
  }

  if (!isAuthorized) return null;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-[#0a0a0a] flex">
      <DashboardSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
