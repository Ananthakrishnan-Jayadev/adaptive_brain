"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from "lucide-react";
import { useEffect } from "react";
import { useToastStore, type Toast as ToastType } from "@/stores/toastStore";

const icons = { success: <CheckCircle2 className="w-5 h-5 text-sage-500" />, error: <XCircle className="w-5 h-5 text-rose-500" />, warning: <AlertTriangle className="w-5 h-5 text-amber-500" />, info: <Info className="w-5 h-5 text-brand-500" /> };
const bdr = { success: "border-l-sage-500", error: "border-l-rose-500", warning: "border-l-amber-500", info: "border-l-brand-500" };

function ToastItem({ toast }: { toast: ToastType }) {
  const rm = useToastStore((s) => s.removeToast);
  useEffect(() => { const t = setTimeout(() => rm(toast.id), toast.duration || 4000); return () => clearTimeout(t); }, [toast.id, toast.duration, rm]);
  return (<motion.div layout initial={{ opacity: 0, x: 50, scale: 0.95 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 50, scale: 0.95 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className={`bg-surface-100 rounded-xl shadow-warm border-l-4 p-4 flex items-start gap-3 min-w-[280px] max-w-[380px] ${bdr[toast.type]}`}><div className="mt-0.5">{icons[toast.type]}</div><div className="flex-1 min-w-0"><p className="text-sm font-semibold text-ink-900">{toast.title}</p>{toast.message && <p className="text-xs text-ink-500 mt-0.5">{toast.message}</p>}</div><button onClick={() => rm(toast.id)} className="p-1 rounded-lg hover:bg-surface-100 text-ink-400"><X className="w-3.5 h-3.5" /></button></motion.div>);
}

export default function ToastContainer() {
  const toasts = useToastStore((s) => s.toasts);
  return (<div className="fixed top-4 right-4 z-[100] flex flex-col gap-2"><AnimatePresence mode="popLayout">{toasts.map((t) => <ToastItem key={t.id} toast={t} />)}</AnimatePresence></div>);
}
