import type { Trip } from "@/types/entities";

const STATUS_COLOR: Record<Trip["status"], string> = {
  requesting: "bg-esmf-secondary",
  assigned: "bg-esmf-secondary",
  arrived: "bg-esmf-secondary",
  inProgress: "bg-esmf-success",
  completed: "bg-gray-400",
  cancelled: "bg-gray-400",
};

/**
 * Placeholder de carte temps réel : positionne des marqueurs mockés sur une
 * grille stylisée en l'absence d'intégration cartographique réelle (hors
 * périmètre de ce scaffold — l'objectif est de démontrer la disposition).
 */
export function LiveTripsMap({ trips }: { trips: Trip[] }) {
  return (
    <div className="relative h-72 w-full overflow-hidden rounded-lg border border-esmf-border bg-[linear-gradient(0deg,rgba(27,58,107,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(27,58,107,0.06)_1px,transparent_1px)] bg-[size:24px_24px]">
      <p className="absolute left-3 top-3 rounded-md bg-esmf-surface/90 px-2 py-1 text-xs font-medium text-esmf-text-muted shadow-sm">
        Carte temps réel — Cotonou / Abomey-Calavi (aperçu)
      </p>
      {trips.map((trip) => {
        const left = 12 + ((trip.pickup.lng * 137) % 76);
        const top = 18 + ((trip.pickup.lat * 211) % 64);
        return (
          <span
            key={trip.id}
            title={`${trip.id} — ${trip.status}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            className={`absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow ${STATUS_COLOR[trip.status]}`}
          />
        );
      })}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-md bg-esmf-surface/90 px-3 py-2 text-xs text-esmf-text-muted shadow-sm">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-esmf-success" /> En course
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-esmf-secondary" /> Assignation en cours
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-400" /> Terminé / annulé
        </span>
      </div>
    </div>
  );
}
