"use client";

import { useState, useTransition } from "react";
import type { PlatformSettings } from "@/types/entities";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/context/toast-context";
import { updateSettings } from "../actions";

interface FieldDef {
  key: keyof PlatformSettings;
  label: string;
  type: "number" | "time";
  suffix?: string;
}

const TARIFF_FIELDS: FieldDef[] = [
  { key: "baseFareTricycle", label: "Tarif de base — tricycle", type: "number", suffix: "FCFA" },
  { key: "baseFareMoto", label: "Tarif de base — moto", type: "number", suffix: "FCFA" },
  { key: "baseFareVoiture", label: "Tarif de base — voiture", type: "number", suffix: "FCFA" },
];

const SURCHARGE_FIELDS: FieldDef[] = [
  { key: "nightSurchargeStart", label: "Début majoration nocturne", type: "time" },
  { key: "nightSurchargeEnd", label: "Fin majoration nocturne", type: "time" },
  { key: "nightSurchargeMinPct", label: "Majoration min.", type: "number", suffix: "%" },
  { key: "nightSurchargeMaxPct", label: "Majoration max.", type: "number", suffix: "%" },
];

const DISCOUNT_FIELDS: FieldDef[] = [
  { key: "studentDiscountPct", label: "Réduction Mode Étudiante", type: "number", suffix: "%" },
  { key: "carpoolingDiscountPct", label: "Réduction covoiturage", type: "number", suffix: "%" },
];

const OPERATIONAL_FIELDS: FieldDef[] = [
  { key: "driverSearchRadiusKm", label: "Rayon de recherche conducteur", type: "number", suffix: "km" },
  { key: "maxCarpoolMotoTricycle", label: "Max. passagères covoiturage (moto/tricycle)", type: "number" },
  { key: "maxCarpoolVoiture", label: "Max. passagères covoiturage (voiture)", type: "number" },
  { key: "lowRatingThreshold", label: "Seuil de suspension automatique", type: "number", suffix: "/5" },
  { key: "lowRatingSampleSize", label: "Échantillon de notation", type: "number", suffix: "courses" },
];

function FieldRow({
  field,
  value,
  onChange,
}: {
  field: FieldDef;
  value: string | number;
  onChange: (key: keyof PlatformSettings, value: string | number) => void;
}) {
  return (
    <label className="flex flex-col gap-1 text-xs font-medium text-esmf-text-muted">
      {field.label}
      <div className="flex items-center gap-2">
        <input
          type={field.type}
          value={value}
          onChange={(e) =>
            onChange(field.key, field.type === "number" ? Number(e.target.value) : e.target.value)
          }
          className="w-full rounded-md border border-esmf-border px-3 py-2 text-sm text-esmf-text outline-none focus:border-esmf-primary"
        />
        {field.suffix && <span className="text-xs text-esmf-text-muted">{field.suffix}</span>}
      </div>
    </label>
  );
}

export function PlatformSettingsForm({ settings }: { settings: PlatformSettings }) {
  const [form, setForm] = useState<PlatformSettings>(settings);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleChange(key: keyof PlatformSettings, value: string | number) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSave() {
    startTransition(async () => {
      await updateSettings(form);
      showToast("Paramètres enregistrés.", "success");
    });
  }

  const sections: { title: string; description: string; fields: FieldDef[] }[] = [
    { title: "Tarification", description: "Tarifs de base par type de véhicule", fields: TARIFF_FIELDS },
    { title: "Majoration nocturne", description: "21h – 5h (ESMF_SPEC.md §4)", fields: SURCHARGE_FIELDS },
    { title: "Réductions", description: "Mode Étudiante et covoiturage", fields: DISCOUNT_FIELDS },
    { title: "Paramètres opérationnels", description: "Recherche conducteur et qualité de service", fields: OPERATIONAL_FIELDS },
  ];

  return (
    <Panel
      title="Paramétrage global"
      description="Tarifs, majorations, réductions et seuils opérationnels"
      actions={
        <Button variant="primary" className="px-4 text-xs" disabled={isPending} onClick={handleSave}>
          {isPending ? "Enregistrement..." : "Enregistrer"}
        </Button>
      }
    >
      <div className="flex flex-col gap-6">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-xs font-semibold uppercase tracking-wide text-esmf-text-muted">
              {section.title}
            </p>
            <p className="mb-2 text-xs text-esmf-text-muted">{section.description}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {section.fields.map((field) => (
                <FieldRow
                  key={field.key}
                  field={field}
                  value={form[field.key] as string | number}
                  onChange={handleChange}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
}
