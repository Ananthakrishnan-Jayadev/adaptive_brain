"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
interface TooltipProps { content: string; position?: "top"|"bottom"|"left"|"right"; children: React.ReactNode }
const ps: Record<string,string> = { top:"bottom-full left-1/2 -translate-x-1/2 mb-2", bottom:"top-full left-1/2 -translate-x-1/2 mt-2", left:"right-full top-1/2 -translate-y-1/2 mr-2", right:"left-full top-1/2 -translate-y-1/2 ml-2" };
const ar: Record<string,string> = { top:"top-full left-1/2 -translate-x-1/2 border-t-ink-800", bottom:"bottom-full left-1/2 -translate-x-1/2 border-b-ink-800", left:"left-full top-1/2 -translate-y-1/2 border-l-ink-800", right:"right-full top-1/2 -translate-y-1/2 border-r-ink-800" };
export default function Tooltip({ content, position="top", children }: TooltipProps) {
  const [s, set] = useState(false);
  return (<span className="relative inline-flex" onMouseEnter={()=>set(true)} onMouseLeave={()=>set(false)}>{children}<AnimatePresence>{s&&<motion.span initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}} transition={{duration:0.15}} className={`absolute z-50 ${ps[position]}`}><span className="bg-ink-800 text-ink-50 text-xs px-3 py-1.5 rounded-lg whitespace-nowrap font-medium">{content}<span className={`absolute w-0 h-0 border-4 border-transparent ${ar[position]}`}/></span></motion.span>}</AnimatePresence></span>);
}
