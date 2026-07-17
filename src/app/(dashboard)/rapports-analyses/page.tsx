import { PageHeader } from "@/components/ui/page-header";
import { RapportsView } from "@/features/rapports-analyses/ui/rapports-view";
import { getReportsRepository } from "@/lib/repositories/factory";

export default async function RapportsAnalysesPage() {
  const repo = getReportsRepository();
  const [mobility, security, financial, socialImpact] = await Promise.all([
    repo.getMobilityKpis(),
    repo.getSecurityKpis(),
    repo.getFinancialKpis(),
    repo.getSocialImpactKpis(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Rapports & analyses"
        description="Indicateurs clés et exports (simulés) pour le pilotage de la plateforme."
      />
      <RapportsView
        mobility={mobility}
        security={security}
        financial={financial}
        socialImpact={socialImpact}
      />
    </div>
  );
}
