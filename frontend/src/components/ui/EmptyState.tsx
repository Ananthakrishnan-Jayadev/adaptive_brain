"use client";
import { motion } from "framer-motion";
import Button from "./Button";
interface P { icon?: React.ReactNode; emoji?: string; title: string; description: string; actionLabel?: string; onAction?: () => void }
export default function EmptyState({ icon, emoji, title, description, actionLabel, onAction }: P) {
  return (<motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="flex flex-col items-center justify-center text-center py-16 px-6">{emoji&&<motion.span initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:200,damping:12,delay:0.1}} className="text-5xl mb-4">{emoji}</motion.span>}{icon&&!emoji&&<motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:200,damping:12,delay:0.1}} className="mb-4 text-ink-300">{icon}</motion.div>}<h3 className="text-lg font-display font-semibold text-ink-800 mb-1.5">{title}</h3><p className="text-sm text-ink-500 max-w-sm">{description}</p>{actionLabel&&onAction&&<div className="mt-5"><Button onClick={onAction}>{actionLabel}</Button></div>}</motion.div>);
}
