"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import React, { useEffect, useRef } from "react";

interface ModalProps { isOpen: boolean; onClose: () => void; size?: "sm" | "md" | "lg" | "fullscreen"; title?: string; children: React.ReactNode }
const sizeStyles = { sm: "max-w-sm", md: "max-w-lg", lg: "max-w-2xl", fullscreen: "max-w-full min-h-screen m-0 rounded-none" };

export default function Modal({ isOpen, onClose, size = "md", title, children }: ModalProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { document.body.style.overflow = isOpen ? "hidden" : ""; return () => { document.body.style.overflow = ""; }; }, [isOpen]);
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={onClose} />
          <motion.div ref={ref} tabIndex={-1} initial={{ opacity: 0, y: 20, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20, scale: 0.97 }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className={`relative bg-surface-100 rounded-3xl shadow-elevated w-full ${sizeStyles[size]} ${size !== "fullscreen" ? "max-h-[90vh] overflow-y-auto" : ""}`}>
            <div className="flex items-center justify-between p-5 pb-0">
              {title && <h3 className="text-lg font-display font-semibold text-ink-900">{title}</h3>}
              <button onClick={onClose} className="ml-auto p-2 rounded-xl hover:bg-surface-100 transition-colors text-ink-400 hover:text-ink-700"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-5">{children}</div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
