import type { MouseEvent, ReactNode } from "react";
import { X } from "lucide-react";
import { Card } from "../ui";

interface ModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export default function Modal({ open, title, onClose, children }: ModalProps) {
  if (!open) {
    return null;
  }

  const stopPropagation = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm" onMouseDown={onClose}>
      <div onMouseDown={stopPropagation} className="max-h-[90vh] w-full max-w-2xl overflow-y-auto">
        <Card className="p-6">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h2 className="text-2xl font-semibold text-white">{title}</h2>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close"
              className="rounded-full border border-black/30 px-3 py-1 text-sm text-teal-200 transition hover:border-white/20 hover:text-white"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
          {children}
        </Card>
      </div>
    </div>
  );
}