"use client";

import { useState } from "react";
import { useRequireRole } from "@/hooks/useRequireRole";
import VolunteerSidebar from "@/components/volunteer/VolunteerSidebar";
import VolunteerHeader from "@/components/volunteer/VolunteerHeader";

export default function VolunteerLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { isPending, isAuthorized } = useRequireRole(["volunteer", "admin"]);

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
      <VolunteerSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col min-w-0">
        <VolunteerHeader onMenuClick={() => setSidebarOpen(true)} />
        <main className="flex-1 p-5 sm:p-6 lg:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
