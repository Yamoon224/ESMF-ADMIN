"use client";

import { useState, useTransition } from "react";
import type { EducationModule } from "@/types/entities";
import { FilterSelect } from "@/components/ui/filter-select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/context/toast-context";
import { setModuleStatus } from "../actions";

const CATEGORY_LABEL: Record<EducationModule["category"], string> = {
  financeEducation: "Éducation financière",
  health: "Santé",
  antiVbg: "Anti-VBG",
};

const CATEGORY_COLOR: Record<EducationModule["category"], string> = {
  financeEducation: "border-esmf-primary/30 bg-esmf-primary/5",
  health: "border-esmf-success/30 bg-esmf-success/5",
  antiVbg: "border-esmf-alert/30 bg-esmf-alert/5",
};

export function ContenusEducatifsView({ modules }: { modules: EducationModule[] }) {
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const filtered = modules.filter(
    (m) => categoryFilter === "all" || m.category === categoryFilter
  );

  function toggleStatus(module_: EducationModule) {
    const next = module_.status === "published" ? "draft" : "published";
    startTransition(async () => {
      await setModuleStatus(module_.id, next);
      showToast(
        next === "published" ? "Module publié." : "Module repassé en brouillon.",
        "info"
      );
    });
  }

  return (
    <Panel
      title="Catalogue des modules éducatifs"
      description={`${filtered.length} module(s) — Éducation financière (EF), Santé (SA), Anti-VBG (VBG)`}
    >
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterSelect
          label="Catégorie"
          value={categoryFilter}
          onChange={setCategoryFilter}
          options={[
            { value: "all", label: "Toutes" },
            { value: "financeEducation", label: "Éducation financière" },
            { value: "health", label: "Santé" },
            { value: "antiVbg", label: "Anti-VBG" },
          ]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((module_) => (
          <div
            key={module_.id}
            className={`flex flex-col gap-2 rounded-lg border p-4 ${CATEGORY_COLOR[module_.category]}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className="text-xs font-semibold uppercase tracking-wide text-esmf-text-muted">
                {module_.code}
              </span>
              <StatusBadge status={module_.status} />
            </div>
            <h3 className="text-sm font-bold text-esmf-text">{module_.title}</h3>
            <p className="text-xs text-esmf-text-muted">{CATEGORY_LABEL[module_.category]}</p>
            <p className="text-xs text-esmf-text-muted">
              {module_.format} — {module_.durationMin} min
            </p>
            <p className="text-xs text-esmf-text-muted">
              Débloqué à {module_.pointsRequired} points de fidélité
            </p>
            <Button
              variant="ghost"
              className="mt-2 min-h-[36px] px-3 text-xs"
              disabled={isPending}
              onClick={() => toggleStatus(module_)}
            >
              {module_.status === "published" ? "Repasser en brouillon" : "Publier"}
            </Button>
          </div>
        ))}
      </div>
    </Panel>
  );
}
