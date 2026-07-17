import { PageHeader } from "@/components/ui/page-header";
import { IncidentsSosView } from "@/features/incidents-sos/ui/incidents-sos-view";
import { getSosRepository, getIncidentsRepository } from "@/lib/repositories/factory";

export default async function IncidentsSosPage() {
  const [alerts, incidents] = await Promise.all([
    getSosRepository().getAll(),
    getIncidentsRepository().getAll(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Incidents & alertes SOS"
        description="Fonctionnalité la plus critique de la plateforme : traitement prioritaire des alertes SOS et suivi des litiges."
      />
      <IncidentsSosView alerts={alerts} incidents={incidents} />
    </div>
  );
}
