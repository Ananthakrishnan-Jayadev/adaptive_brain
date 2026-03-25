"use client";
import { motion } from "framer-motion";
interface CircularProgressProps { value: number; size?: number; strokeWidth?: number; showLabel?: boolean; className?: string }
function getColor(v: number): string { if (v < 30) return "#9c3636"; if (v < 50) return "#a07518"; if (v < 70) return "#be8e2a"; return "#337842"; }
export default function CircularProgress({ value, size = 100, strokeWidth = 8, showLabel = true, className = "" }: CircularProgressProps) {
  const r = (size - strokeWidth) / 2, c = r * 2 * Math.PI, p = Math.min(Math.max(value, 0), 100), off = c - (p / 100) * c, color = getColor(p);
  return (<div className={`relative inline-flex items-center justify-center ${className}`}><svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}><circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#d0c9be" strokeWidth={strokeWidth}/><motion.circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={c} initial={{strokeDashoffset:c}} animate={{strokeDashoffset:off}} transition={{type:"spring",stiffness:40,damping:15}} transform={`rotate(-90 ${size/2} ${size/2})`}/></svg>{showLabel&&<div className="absolute inset-0 flex flex-col items-center justify-center"><motion.span key={value} initial={{scale:0.8,opacity:0}} animate={{scale:1,opacity:1}} className="text-lg font-display font-bold" style={{color}}>{p}%</motion.span></div>}</div>);
}
