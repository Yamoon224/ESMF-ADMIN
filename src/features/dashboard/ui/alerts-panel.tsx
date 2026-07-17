import Link from "next/link";
import type { Incident, SosAlert } from "@/types/entities";
import { StatusBadge } from "@/components/ui/status-badge";

const INCIDENT_TYPE_LABEL: Record<Incident["type"], string> = {
  harassment: "Harcèlement",
  tariff: "Litige tarifaire",
  payment: "Paiement",
  accident: "Accident",
  complaint: "Réclamation",
};

export function AlertsPanel({
  sosAlerts,
  incidents,
}: {
  sosAlerts: SosAlert[];
  incidents: Incident[];
}) {
  const hasAlerts = sosAlerts.length > 0 || incidents.length > 0;

  return (
    <div className="flex flex-col gap-3">
      {!hasAlerts && (
        <p className="text-sm text-esmf-text-muted">Aucune alerte active pour le moment.</p>
      )}

      {sosAlerts.map((alert) => (
        <Link
          key={alert.id}
          href="/incidents-sos"
          className="flex items-center justify-between gap-3 rounded-lg border border-esmf-alert/30 bg-esmf-alert/5 px-3 py-2.5 hover:bg-esmf-alert/10"
        >
          <div>
            <p className="text-sm font-semibold text-esmf-alert">Alerte SOS active</p>
            <p className="text-xs text-esmf-text-muted">
              Trajet {alert.tripId} — déclenchée à{" "}
              {new Date(alert.triggeredAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}
            </p>
          </div>
          <StatusBadge status="active" />
        </Link>
      ))}

      {incidents.map((incident) => (
        <Link
          key={incident.id}
          href="/incidents-sos"
          className="flex items-center justify-between gap-3 rounded-lg border border-esmf-border px-3 py-2.5 hover:bg-esmf-bg"
        >
          <div>
            <p className="text-sm font-semibold text-esmf-text">
              {INCIDENT_TYPE_LABEL[incident.type]}
            </p>
            <p className="text-xs text-esmf-text-muted">{incident.description}</p>
          </div>
          <StatusBadge status={incident.status} />
        </Link>
      ))}
    </div>
  );
}
