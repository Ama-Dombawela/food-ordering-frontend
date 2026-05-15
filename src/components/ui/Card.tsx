import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl border border-teal-900/80 bg-teal-950/55 p-6 shadow-lg shadow-teal-950/35 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
