"use client";

import { useState, useTransition } from "react";
import type { SosAlert } from "@/types/entities";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/context/toast-context";
import { resolveSosAlert } from "../actions";

function formatDateTime(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function SosPanel({ alerts }: { alerts: SosAlert[] }) {
  const active = alerts.filter((a) => a.status === "active");
  const history = alerts
    .filter((a) => a.status !== "active")
    .sort((a, b) => (a.triggeredAt < b.triggeredAt ? 1 : -1));

  const [closingId, setClosingId] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleResolve(alertId: string, resolution: "resolved" | "falseAlarm") {
    startTransition(async () => {
      await resolveSosAlert(alertId, resolution, notes || "Aucune note ajoutée.");
      setClosingId(null);
      setNotes("");
      showToast(
        resolution === "resolved" ? "Alerte SOS clôturée." : "Alerte marquée comme fausse alerte.",
        "success"
      );
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <Panel
        title="Alertes SOS actives"
        description="Priorité maximale — traiter immédiatement"
      >
        {active.length === 0 ? (
          <p className="text-sm text-esmf-text-muted">Aucune alerte SOS active. RAS.</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {active.map((alert) => (
              <li
                key={alert.id}
                className="rounded-lg border-2 border-esmf-alert bg-esmf-alert/5 p-4 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="flex items-center gap-2 text-sm font-bold text-esmf-alert">
                      <span className="h-2.5 w-2.5 animate-sos-blink rounded-full bg-esmf-alert" />
                      Alerte SOS — {alert.id}
                    </p>
                    <p className="mt-1 text-xs text-esmf-text-muted">
                      Déclenchée à {formatDateTime(alert.triggeredAt)} — trajet {alert.tripId}
                    </p>
                    <p className="text-xs text-esmf-text-muted">
                      Position : {alert.position.lat.toFixed(4)}, {alert.position.lng.toFixed(4)}
                    </p>
                  </div>
                  <StatusBadge status="active" />
                </div>

                {closingId === alert.id ? (
                  <div className="mt-3 flex flex-col gap-2">
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Note de clôture (résultat de l'intervention)..."
                      rows={2}
                      className="w-full rounded-md border border-esmf-border px-3 py-2 text-sm outline-none focus:border-esmf-primary"
                    />
                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="success"
                        className="min-h-[36px] px-3 text-xs"
                        disabled={isPending}
                        onClick={() => handleResolve(alert.id, "resolved")}
                      >
                        Confirmer résolution
                      </Button>
                      <Button
                        variant="ghost"
                        className="min-h-[36px] px-3 text-xs"
                        disabled={isPending}
                        onClick={() => handleResolve(alert.id, "falseAlarm")}
                      >
                        Fausse alerte
                      </Button>
                      <Button
                        variant="ghost"
                        className="min-h-[36px] px-3 text-xs"
                        onClick={() => setClosingId(null)}
                      >
                        Annuler
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="mt-3">
                    <Button
                      variant="alert"
                      className="min-h-[40px] px-4 text-xs"
                      onClick={() => setClosingId(alert.id)}
                    >
                      Clôturer l&apos;alerte
                    </Button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Historique SOS" description="Alertes résolues ou fausses alertes">
        <ul className="flex flex-col divide-y divide-esmf-border">
          {history.map((alert) => (
            <li key={alert.id} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
              <div>
                <p className="text-sm text-esmf-text">
                  {alert.id} — trajet {alert.tripId}
                </p>
                <p className="text-xs text-esmf-text-muted">
                  {formatDateTime(alert.triggeredAt)}
                  {alert.resolvedAt && ` → résolue le ${formatDateTime(alert.resolvedAt)}`}
                </p>
                {alert.notes && <p className="text-xs text-esmf-text-muted">{alert.notes}</p>}
              </div>
              <StatusBadge status={alert.status} />
            </li>
          ))}
        </ul>
      </Panel>
    </div>
  );
}
