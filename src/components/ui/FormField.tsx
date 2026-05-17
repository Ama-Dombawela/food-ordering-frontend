import React from 'react';

interface FormFieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  required?: boolean;
  helperText?: string;
}

// Form wrapper that keeps labels, helper text, and errors aligned.
export const FormField: React.FC<FormFieldProps> = ({
  label,
  error,
  children,
  required = false,
  helperText,
}) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-teal-200">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      {children}
      {error && (
        <span className="text-xs font-medium text-red-500">{error}</span>
      )}
      {helperText && !error && (
        <span className="text-xs text-teal-200/70">{helperText}</span>
      )}
    </div>
  );
};
