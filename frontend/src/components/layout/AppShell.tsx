"use client";

import { motion } from "framer-motion";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import ToastContainer from "@/components/ui/Toast";
import VoiceFAB from "@/components/shared/VoiceFAB";

interface AppShellProps {
  children: React.ReactNode;
}

export default function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#FCF9F1]">
      <Sidebar />
      <div className="lg:pl-64">
        <TopBar />
        <motion.main
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="p-4 sm:p-6 lg:p-8 max-w-6xl mx-auto"
        >
          {children}
        </motion.main>
      </div>
      <ToastContainer />
      <VoiceFAB />
    </div>
  );
}
