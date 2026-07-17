import { PageHeader } from "@/components/ui/page-header";
import { PlatformSettingsForm } from "@/features/parametres/ui/platform-settings-form";
import { RolesAccessPanel } from "@/features/parametres/ui/roles-access-panel";
import { getSettingsRepository } from "@/lib/repositories/factory";

export default async function ParametresPage() {
  const settings = await getSettingsRepository().get();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Paramètres"
        description="Paramétrage tarifaire, opérationnel et gestion des rôles/accès."
      />
      <PlatformSettingsForm settings={settings} />
      <RolesAccessPanel />
    </div>
  );
}
