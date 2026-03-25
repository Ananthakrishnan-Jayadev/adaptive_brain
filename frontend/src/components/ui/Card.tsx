"use client";

import { motion } from "framer-motion";
import React from "react";

interface CardProps {
  variant?: "default" | "elevated" | "interactive" | "highlighted";
  padding?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-surface-100 shadow-soft border border-surface-200",
  elevated: "bg-surface-100 shadow-warm",
  interactive: "bg-surface-100 shadow-soft border border-surface-200 cursor-pointer",
  highlighted: "bg-surface-100 shadow-soft border-2 border-brand-300",
};

export default function Card({ variant = "default", padding = "md", onClick, className = "", children }: CardProps) {
  const isInteractive = variant === "interactive" || !!onClick;
  return (
    <motion.div whileHover={isInteractive ? { y: -3, boxShadow: "0 8px 25px -5px rgba(0,0,0,0.12)" } : undefined} whileTap={isInteractive ? { scale: 0.99 } : undefined} transition={{ type: "spring", stiffness: 300, damping: 20 }} onClick={onClick}
      className={`rounded-2xl ${variantStyles[variant]} ${padding === "sm" ? "p-3" : padding === "md" ? "p-5" : "p-7"} ${isInteractive ? "cursor-pointer" : ""} ${className}`}>
      {children}
    </motion.div>
  );
}
