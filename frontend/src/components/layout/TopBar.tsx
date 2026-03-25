"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, Flame } from "lucide-react";
import { useNavigationStore } from "@/stores/navigationStore";
import { currentUser } from "@/lib/mock-data";
import NotificationBell from "./NotificationBell";
import Tooltip from "@/components/ui/Tooltip";
export default function TopBar() {
  const { toggleSidebar } = useNavigationStore();
  const xp = Math.min((currentUser.daily_xp_earned / currentUser.daily_xp_goal) * 100, 100);
  return (<header className="sticky top-0 z-20 bg-surface-100/80 backdrop-blur-md border-b border-surface-200"><div className="flex items-center justify-between h-14 px-4 lg:pl-72 lg:pr-6"><button onClick={toggleSidebar} className="lg:hidden p-2 rounded-xl hover:bg-surface-100 text-ink-600"><Menu className="w-5 h-5"/></button><div className="hidden sm:flex items-center gap-3 flex-1 max-w-xs mx-auto"><span className="text-xs font-semibold text-ink-500">{currentUser.daily_xp_earned}/{currentUser.daily_xp_goal} XP</span><div className="flex-1 h-2.5 bg-surface-200 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${xp}%`}} transition={{type:"spring",stiffness:60,damping:15}} className="h-full rounded-full bg-gradient-to-r from-coral-400 to-coral-500 relative overflow-hidden">{xp>70&&<div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-100/30 to-transparent animate-shimmer bg-[length:200%_100%]"/>}</motion.div></div></div><div className="flex items-center gap-2"><Tooltip content={`${currentUser.current_streak}-day streak!`}><div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl hover:bg-surface-50 transition-colors"><motion.div animate={{scale:[1,1.1,1]}} transition={{repeat:Infinity,duration:1.5}}><Flame className="w-4.5 h-4.5 text-coral-500 fill-coral-500"/></motion.div><span className="text-sm font-bold text-ink-800">{currentUser.current_streak}</span></div></Tooltip><NotificationBell/><Link href="/profile" className="w-8 h-8 rounded-full bg-brand-100 flex items-center justify-center hover:ring-2 hover:ring-brand-300 transition-all"><span className="text-brand-600 font-semibold text-xs">{currentUser.name.split(" ").map((n)=>n[0]).join("")}</span></Link></div></div></header>);
}
