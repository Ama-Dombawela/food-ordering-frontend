import type { ButtonHTMLAttributes, ReactNode } from "react";
import Spinner from "../common/Spinner";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
  fullWidth?: boolean;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  loading = false,
  fullWidth = false,
  disabled = false,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variantClasses = {
    primary: "bg-teal-500 text-teal-50 hover:bg-teal-400 shadow-lg shadow-teal-950/35",
    secondary: "border border-teal-700 bg-teal-950/70 text-teal-100 hover:bg-teal-900",
    danger: "bg-rose-600 text-white hover:bg-rose-500",
  };

  return (
    <button
      disabled={disabled || loading}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${fullWidth ? "w-full" : ""} ${variantClasses[variant]} ${className}`}
      {...props}
    >
      {loading ? <Spinner size="sm" inline /> : null}
      {children}
    </button>
  );
}
