import type { Incident, SosAlert } from "@/types/entities";
import { SosPanel } from "./sos-panel";
import { IncidentsTable } from "./incidents-table";

export function IncidentsSosView({
  alerts,
  incidents,
}: {
  alerts: SosAlert[];
  incidents: Incident[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <SosPanel alerts={alerts} />
      <IncidentsTable incidents={incidents} />
    </div>
  );
}
