import { PageHeader } from "@/components/ui/page-header";
import { ConductricesView } from "@/features/conductrices/ui/conductrices-view";
import { getDriversRepository } from "@/lib/repositories/factory";

export default async function ConductricesPage() {
  const [drivers, expiringDocs] = await Promise.all([
    getDriversRepository().getAll(),
    getDriversRepository().getExpiringDocuments(30),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestion des conductrices"
        description="Liste, file d'inscription et suivi documentaire des conductrices."
      />
      <ConductricesView drivers={drivers} expiringDocs={expiringDocs} />
    </div>
  );
}
