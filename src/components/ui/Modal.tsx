import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

// Reusable modal used by forms and admin edit dialogs.
export function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-teal-950/70 px-4 py-6 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-2xl rounded-3xl border border-teal-800 bg-teal-950/80 p-6 shadow-2xl shadow-teal-950/50" onMouseDown={(event) => event.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between gap-4">
          <h2 className="text-2xl font-semibold text-white">{title}</h2>
          <button type="button" onClick={onClose} className="rounded-full border border-teal-700 px-3 py-1 text-sm text-teal-200 transition hover:border-teal-400 hover:text-white">
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}