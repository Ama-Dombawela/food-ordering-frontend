import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

// Text input primitive with optional label and validation message support.
export function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="block space-y-2">
      {label ? <span className="text-sm font-medium text-teal-200">{label}</span> : null}
      <input
        className={`w-full rounded-2xl border border-teal-800 bg-teal-950/70 px-4 py-3 text-teal-50 outline-none transition placeholder:text-teal-400/70 focus:border-teal-400 focus:ring-2 focus:ring-teal-400/20 ${error ? "border-rose-500 focus:border-rose-500 focus:ring-rose-500/20" : ""} ${className}`}
        {...props}
      />
      {error ? <span className="text-xs text-rose-300">{error}</span> : null}
    </label>
  );
}
