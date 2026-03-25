"use client";

interface BadgeProps {
  variant?: "default" | "success" | "warning" | "error" | "info";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
  children: React.ReactNode;
}

const variantStyles = {
  default: "bg-surface-100 text-ink-600",
  success: "bg-sage-50 text-sage-700",
  warning: "bg-amber-50 text-amber-700",
  error: "bg-rose-50 text-rose-700",
  info: "bg-brand-50 text-brand-700",
};

const dotColors = {
  default: "bg-ink-400",
  success: "bg-sage-500",
  warning: "bg-amber-500",
  error: "bg-rose-500",
  info: "bg-brand-500",
};

export default function Badge({
  variant = "default",
  size = "sm",
  dot = false,
  className = "",
  children,
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 rounded-full font-medium
        ${variantStyles[variant]}
        ${size === "sm" ? "px-2.5 py-0.5 text-xs" : "px-3 py-1 text-sm"}
        ${className}
      `}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
