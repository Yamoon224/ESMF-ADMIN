"use client";

import { Download, FileText } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/toast-context";

interface KpiEntry {
  label: string;
  value: string | number;
}

function KpiGrid({ items }: { items: KpiEntry[] }) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border border-esmf-border p-3">
          <p className="text-xs text-esmf-text-muted">{item.label}</p>
          <p className="mt-1 text-lg font-bold text-esmf-text">{item.value}</p>
        </div>
      ))}
    </div>
  );
}

function ExportButtons({ scope }: { scope: string }) {
  const { showToast } = useToast();
  return (
    <div className="flex gap-2">
      <Button
        variant="ghost"
        className="min-h-[36px] px-3 text-xs"
        onClick={() => showToast(`Export CSV simulé — ${scope}.`, "info")}
      >
        <Download size={14} /> CSV
      </Button>
      <Button
        variant="ghost"
        className="min-h-[36px] px-3 text-xs"
        onClick={() => showToast(`Export PDF simulé — ${scope}.`, "info")}
      >
        <FileText size={14} /> PDF
      </Button>
    </div>
  );
}

export function RapportsView({
  mobility,
  security,
  financial,
  socialImpact,
}: {
  mobility: KpiEntry[];
  security: KpiEntry[];
  financial: KpiEntry[];
  socialImpact: KpiEntry[];
}) {
  return (
    <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
      <Panel
        title="Mobilité"
        description="Indicateurs d'usage de la plateforme"
        actions={<ExportButtons scope="Mobilité" />}
      >
        <KpiGrid items={mobility} />
      </Panel>
      <Panel
        title="Sécurité"
        description="SOS, incidents et trajets sécurisés"
        actions={<ExportButtons scope="Sécurité" />}
      >
        <KpiGrid items={security} />
      </Panel>
      <Panel
        title="Financier"
        description="Revenus et répartition des paiements"
        actions={<ExportButtons scope="Financier" />}
      >
        <KpiGrid items={financial} />
      </Panel>
      <Panel
        title="Impact social"
        description="Étudiantes, autonomisation des conductrices, fidélité"
        actions={<ExportButtons scope="Impact social" />}
      >
        <KpiGrid items={socialImpact} />
      </Panel>
    </div>
  );
}
