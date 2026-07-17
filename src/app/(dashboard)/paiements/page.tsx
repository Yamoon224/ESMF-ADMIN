import { PageHeader } from "@/components/ui/page-header";
import { PaiementsView } from "@/features/paiements/ui/paiements-view";
import { getPaymentsRepository } from "@/lib/repositories/factory";

export default async function PaiementsPage() {
  const repo = getPaymentsRepository();
  const [payments, revenueTrend, methodBreakdown] = await Promise.all([
    repo.getAll(),
    repo.getRevenueTrend(),
    repo.getBreakdownByMethod(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Paiements"
        description="Revenus, répartition par méthode et transactions."
      />
      <PaiementsView payments={payments} revenueTrend={revenueTrend} methodBreakdown={methodBreakdown} />
    </div>
  );
}
