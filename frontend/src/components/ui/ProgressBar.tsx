"use client";
import { motion } from "framer-motion";
interface ProgressBarProps { value: number; max?: number; color?: string; size?: "sm"|"md"|"lg"; showLabel?: boolean; labelPosition?: "inside"|"right"; shimmer?: boolean; className?: string }
const sz = { sm: "h-1.5", md: "h-3", lg: "h-5" };
export default function ProgressBar({ value, max=100, color="bg-brand-500", size="md", showLabel=false, labelPosition="right", shimmer=false, className="" }: ProgressBarProps) {
  const pct = Math.min(Math.round((value/max)*100),100);
  return (<div className={`flex items-center gap-2 ${className}`}><div className={`flex-1 rounded-full bg-surface-200 overflow-hidden ${sz[size]}`}><motion.div initial={{width:0}} animate={{width:`${pct}%`}} transition={{type:"spring",stiffness:60,damping:15}} className={`h-full rounded-full ${color} relative overflow-hidden`}>{shimmer&&<div className="absolute inset-0 bg-gradient-to-r from-transparent via-surface-100/25 to-transparent animate-shimmer bg-[length:200%_100%]"/>}{showLabel&&labelPosition==="inside"&&size==="lg"&&<span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-ink-50">{pct}%</span>}</motion.div></div>{showLabel&&labelPosition==="right"&&<span className="text-xs font-semibold text-ink-500 min-w-[2.5rem] text-right">{pct}%</span>}</div>);
}
