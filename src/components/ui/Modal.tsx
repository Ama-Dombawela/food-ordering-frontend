import type { ReactNode } from "react";
import { X } from "lucide-react";
import { Card } from "./Card";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm" onMouseDown={onClose}>
      <div className="w-full max-w-2xl" onMouseDown={(event) => event.stopPropagation()}>
        <Card>
          <div className="mb-6 flex items-start justify-between gap-4">
            <h2 className="text-2xl font-semibold text-white">{title}</h2>
            <button type="button" onClick={onClose} aria-label="Close" className="rounded-full border border-black/30 px-3 py-1 text-sm text-teal-200 transition hover:border-white/20 hover:text-white">
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
}