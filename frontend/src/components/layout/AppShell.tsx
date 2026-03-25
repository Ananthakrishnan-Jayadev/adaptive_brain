"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ToastContainer from "@/components/ui/Toast";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-surface-100">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <main className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto">
          {children}
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}
