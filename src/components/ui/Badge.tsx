import type { ReactNode } from "react";

interface BadgeProps {
  variant?: "green" | "red" | "yellow" | "blue" | "neutral";
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "neutral", children, className = "" }: BadgeProps) {
  const variantClasses = {
    green: "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
    red: "bg-rose-500/15 text-rose-300 ring-rose-500/30",
    yellow: "bg-teal-500/15 text-teal-200 ring-teal-500/40",
    blue: "bg-teal-500/15 text-teal-200 ring-teal-500/40",
    neutral: "bg-teal-950/70 text-teal-200 ring-teal-800",
  };

  return (
    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] ring-1 ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
