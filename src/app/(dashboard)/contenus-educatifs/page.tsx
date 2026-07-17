import { PageHeader } from "@/components/ui/page-header";
import { ContenusEducatifsView } from "@/features/contenus-educatifs/ui/contenus-educatifs-view";
import { getEducationRepository } from "@/lib/repositories/factory";

export default async function ContenusEducatifsPage() {
  const modules = await getEducationRepository().getModules();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Contenus éducatifs"
        description="Catalogue des modules d'éducation financière, santé et anti-VBG."
      />
      <ContenusEducatifsView modules={modules} />
    </div>
  );
}
