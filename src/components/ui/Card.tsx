import type { ReactNode } from "react";

interface CardProps {
  children: ReactNode;
  className?: string;
}

// Basic elevated container used to group related UI content.
export function Card({ children, className = "" }: CardProps) {
  return (
    <div className={`rounded-3xl border border-black/40 bg-black/80 p-6 shadow-lg shadow-black/50 backdrop-blur ${className}`}>
      {children}
    </div>
  );
}
