import type { Driver } from "@/types/entities";

type Availability = "available" | "onTrip" | "offline";

function hashToPercent(seed: string, salt: number): number {
  let hash = salt;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) % 1000;
  }
  return 10 + (hash % 80);
}

const AVAILABILITY_COLOR: Record<Availability, string> = {
  available: "bg-esmf-success",
  onTrip: "bg-esmf-secondary",
  offline: "bg-gray-400",
};

/**
 * Carte temps réel des conductrices (placeholder). Légende conforme au
 * brief : vert = disponible, orange = en course, gris = hors ligne.
 */
export function DriversAvailabilityMap({
  drivers,
  tripsInProgressDriverIds,
}: {
  drivers: Driver[];
  tripsInProgressDriverIds: Set<string>;
}) {
  function availabilityOf(driver: Driver): Availability {
    if (!driver.isOnline) return "offline";
    if (tripsInProgressDriverIds.has(driver.id)) return "onTrip";
    return "available";
  }

  return (
    <div className="relative h-96 w-full overflow-hidden rounded-lg border border-esmf-border bg-[linear-gradient(0deg,rgba(27,58,107,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(27,58,107,0.06)_1px,transparent_1px)] bg-[size:24px_24px]">
      <p className="absolute left-3 top-3 rounded-md bg-esmf-surface/90 px-2 py-1 text-xs font-medium text-esmf-text-muted shadow-sm">
        Positions des conductrices (aperçu mocké)
      </p>
      {drivers.map((driver) => {
        const left = hashToPercent(driver.id, 7);
        const top = hashToPercent(driver.id, 91);
        const availability = availabilityOf(driver);
        return (
          <span
            key={driver.id}
            title={`${driver.firstName} ${driver.lastName} — ${availability}`}
            style={{ left: `${left}%`, top: `${top}%` }}
            className={`absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow ${AVAILABILITY_COLOR[availability]}`}
          />
        );
      })}
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-md bg-esmf-surface/90 px-3 py-2 text-xs text-esmf-text-muted shadow-sm">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-esmf-success" /> Disponible
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-esmf-secondary" /> En course
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-gray-400" /> Hors ligne
        </span>
      </div>
    </div>
  );
}

export type { Availability };
