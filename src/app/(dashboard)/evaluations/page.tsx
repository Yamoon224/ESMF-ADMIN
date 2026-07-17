import { PageHeader } from "@/components/ui/page-header";
import { EvaluationsView } from "@/features/evaluations/ui/evaluations-view";
import { getEvaluationsRepository, getDriversRepository } from "@/lib/repositories/factory";

export default async function EvaluationsPage() {
  const [flaggedDrivers, reviews, drivers] = await Promise.all([
    getEvaluationsRepository().getFlaggedDrivers(),
    getEvaluationsRepository().getReviews(),
    getDriversRepository().getAll(),
  ]);

  const driversById = new Map(drivers.map((d) => [d.id, d]));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Évaluations"
        description="Suivi des notes conductrices et historique des avis passagères."
      />
      <EvaluationsView flaggedDrivers={flaggedDrivers} reviews={reviews} driversById={driversById} />
    </div>
  );
}
