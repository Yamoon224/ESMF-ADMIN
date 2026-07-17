"use client";

import type { ReactNode } from "react";

interface DrawerProps {
  open: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: ReactNode;
  footer?: ReactNode;
}

export function Drawer({ open, onClose, title, subtitle, children, footer }: DrawerProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden
      />
      <div className="esmf-scroll relative flex h-full w-full max-w-lg flex-col overflow-y-auto bg-esmf-surface shadow-2xl">
        <div className="sticky top-0 z-10 flex items-start justify-between gap-3 border-b border-esmf-border bg-esmf-surface p-5">
          <div>
            <h2 className="text-lg font-bold text-esmf-text">{title}</h2>
            {subtitle && <p className="text-sm text-esmf-text-muted">{subtitle}</p>}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Fermer"
            className="rounded-full p-1.5 text-esmf-text-muted hover:bg-esmf-bg hover:text-esmf-text"
          >
            ✕
          </button>
        </div>
        <div className="flex-1 p-5">{children}</div>
        {footer && <div className="sticky bottom-0 border-t border-esmf-border bg-esmf-surface p-4">{footer}</div>}
      </div>
    </div>
  );
}
