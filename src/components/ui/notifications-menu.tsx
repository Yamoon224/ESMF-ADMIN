"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

interface NotificationItem {
  id: string;
  message: string;
  time: string;
}

const MOCK_NOTIFICATIONS: NotificationItem[] = [
  { id: "n1", message: "Nouvelle inscription conductrice en attente de validation.", time: "Il y a 12 min" },
  { id: "n2", message: "Document « assurance » bientôt expiré — Odile Sagbo.", time: "Il y a 1 h" },
  { id: "n3", message: "Nouvelle réclamation tarifaire déposée.", time: "Il y a 3 h" },
  { id: "n4", message: "Vérification Mode Étudiante en attente — Rachidatou Alassane.", time: "Hier" },
];

export function NotificationsMenu() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label="Notifications"
        className="relative flex h-11 w-11 items-center justify-center rounded-full border border-esmf-border text-esmf-text-muted hover:bg-esmf-bg hover:text-esmf-primary"
      >
        <Bell size={18} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-esmf-secondary" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute right-0 z-20 mt-2 w-80 rounded-xl border border-esmf-border bg-esmf-surface p-2 shadow-xl">
            <p className="px-2 py-1.5 text-xs font-semibold uppercase tracking-wide text-esmf-text-muted">
              Notifications récentes
            </p>
            <ul className="flex flex-col">
              {MOCK_NOTIFICATIONS.map((n) => (
                <li key={n.id} className="rounded-lg px-2 py-2 text-sm hover:bg-esmf-bg">
                  <p className="text-esmf-text">{n.message}</p>
                  <p className="mt-0.5 text-xs text-esmf-text-muted">{n.time}</p>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
