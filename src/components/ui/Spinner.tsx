// Centered loading spinner for async states.
interface SpinnerProps {
  size?: "sm" | "md" | "lg";
  inline?: boolean;
}

export function Spinner({ size = "md", inline = false }: SpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-4",
    lg: "h-12 w-12 border-4",
  };

  const spinner = <div className={`animate-spin rounded-full border-teal-400 border-t-transparent ${sizeClasses[size]}`} />;

  if (inline) {
    return spinner;
  }

  return <div className="flex min-h-[40vh] items-center justify-center">{spinner}</div>;
}