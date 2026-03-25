"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderOpen, RotateCcw, Trophy, User, Settings, Clock, X } from "lucide-react";
import { useNavigationStore } from "@/stores/navigationStore";
import { currentUser, spacedRepetitionCards } from "@/lib/mock-data";
const today = new Date().toISOString().split("T")[0];
const dueCount = spacedRepetitionCards.filter((c) => c.next_review_date <= today).length;
const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/project/proj_001", label: "My Projects", icon: FolderOpen },
  { href: "/review", label: "Reviews", icon: RotateCcw, badge: dueCount },
  { href: "/achievements", label: "Achievements", icon: Trophy },
  { href: "/history", label: "History", icon: Clock },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/settings", label: "Settings", icon: Settings },
];
export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useNavigationStore();
  const ct = (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-5 lg:p-6">
        <Link href="/dashboard" className="flex items-center gap-2.5"><div className="w-9 h-9 rounded-xl gradient-brand flex items-center justify-center"><span className="text-ink-50 font-display font-bold text-sm">AB</span></div><span className="font-display font-bold text-ink-900 text-lg">Adaptive Brain</span></Link>
        <button onClick={()=>setSidebarOpen(false)} className="lg:hidden p-2 rounded-xl hover:bg-surface-100 text-ink-400"><X className="w-5 h-5"/></button>
      </div>
      <nav className="flex-1 px-3 space-y-1">
        {navLinks.map((link)=>{const isActive=pathname===link.href||pathname.startsWith(link.href+"/");const Icon=link.icon;return(
          <Link key={link.href} href={link.href} onClick={()=>setSidebarOpen(false)} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${isActive?"bg-brand-50 text-brand-600":"text-ink-500 hover:bg-surface-100 hover:text-ink-800"}`}>
            {isActive&&<motion.div layoutId="sidebar-active" className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-500 rounded-r-full" transition={{type:"spring",stiffness:300,damping:25}}/>}
            <Icon className="w-5 h-5"/><span>{link.label}</span>
            {link.badge&&link.badge>0&&<span className="ml-auto bg-coral-500 text-ink-50 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">{link.badge}</span>}
          </Link>);})}
      </nav>
      <div className="p-4 border-t border-surface-200">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-brand-100 flex items-center justify-center"><span className="text-brand-600 font-semibold text-sm">{currentUser.name.split(" ").map((n)=>n[0]).join("")}</span></div>
          <div className="flex-1 min-w-0"><p className="text-sm font-medium text-ink-800 truncate">{currentUser.name}</p><p className="text-xs text-ink-400 truncate">{currentUser.email}</p></div>
        </div>
      </div>
    </div>
  );
  return (<><aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-surface-100 border-r border-surface-200 z-30">{ct}</aside><AnimatePresence>{sidebarOpen&&(<><motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 bg-ink-950/40 backdrop-blur-sm z-40 lg:hidden" onClick={()=>setSidebarOpen(false)}/><motion.aside initial={{x:-280}} animate={{x:0}} exit={{x:-280}} transition={{type:"spring",stiffness:300,damping:30}} className="fixed inset-y-0 left-0 w-72 bg-surface-100 shadow-elevated z-50 lg:hidden">{ct}</motion.aside></>)}</AnimatePresence></>);
}
