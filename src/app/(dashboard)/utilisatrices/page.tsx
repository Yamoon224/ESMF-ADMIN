import { PageHeader } from "@/components/ui/page-header";
import { UtilisatricesView } from "@/features/utilisatrices/ui/utilisatrices-view";
import { getUsersRepository } from "@/lib/repositories/factory";

export default async function UtilisatricesPage() {
  const users = await getUsersRepository().getAll();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Gestion des utilisatrices"
        description="Liste des passagères, filtres et validation du Mode Étudiante."
      />
      <UtilisatricesView users={users} />
    </div>
  );
}
