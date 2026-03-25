"use client";

import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

const variantStyles = {
  primary: "bg-brand-500 text-white hover:bg-brand-600 active:bg-brand-700 shadow-soft",
  secondary: "bg-surface-100 text-ink-800 border-2 border-surface-300 hover:border-brand-400 hover:bg-surface-200",
  ghost: "bg-transparent text-ink-600 hover:bg-surface-200 hover:text-ink-900",
  danger: "bg-rose-500 text-white hover:bg-rose-600 active:bg-rose-700",
};

const sizeStyles = {
  sm: "px-3 py-1.5 text-sm rounded-xl gap-1.5",
  md: "px-5 py-2.5 text-sm rounded-2xl gap-2",
  lg: "px-7 py-3.5 text-base rounded-2xl gap-2.5",
};

export default function Button({ variant = "primary", size = "md", loading = false, icon, iconPosition = "left", children, disabled, className = "", ...props }: ButtonProps) {
  return (
    <motion.button whileHover={{ scale: disabled || loading ? 1 : 1.02, y: disabled || loading ? 0 : -1 }} whileTap={{ scale: disabled || loading ? 1 : 0.97 }} transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`inline-flex items-center justify-center font-semibold font-body transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
      disabled={disabled || loading} {...(props as any)}>
      {loading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!loading && icon && iconPosition === "left" && icon}
      {children}
      {!loading && icon && iconPosition === "right" && icon}
    </motion.button>
  );
}
