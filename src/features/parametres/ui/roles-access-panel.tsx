import { Check, X } from "lucide-react";
import { Panel } from "@/components/ui/panel";
import { ADMIN_ROLES, PERMISSION_MATRIX_READONLY } from "@/lib/rbac/roles";
import type { NavSectionId } from "@/lib/rbac/roles";

const SECTION_LABEL: Record<NavSectionId, string> = {
  dashboard: "Tableau de bord",
  utilisatrices: "Utilisatrices",
  conductrices: "Conductrices",
  courses: "Courses en temps réel",
  paiements: "Paiements",
  "incidents-sos": "Incidents & SOS",
  evaluations: "Évaluations",
  "contenus-educatifs": "Contenus éducatifs",
  "rapports-analyses": "Rapports & analyses",
  parametres: "Paramètres",
};

export function RolesAccessPanel() {
  const sections = Object.keys(PERMISSION_MATRIX_READONLY) as NavSectionId[];

  return (
    <Panel
      title="Gestion des rôles & accès"
      description="6 profils admin (CDCF §2.2.3) — matrice de visibilité des sections. Modifiable via le sélecteur de profil dans la barre supérieure (mock RBAC)."
    >
      <div className="esmf-scroll overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-esmf-border bg-esmf-bg/60">
              <th className="px-3 py-2 text-left font-semibold text-esmf-text-muted">Section</th>
              {ADMIN_ROLES.map((role) => (
                <th key={role.id} className="px-3 py-2 text-center font-semibold text-esmf-text-muted">
                  {role.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sections.map((section) => (
              <tr key={section} className="border-b border-esmf-border last:border-0">
                <td className="px-3 py-2 font-medium text-esmf-text">{SECTION_LABEL[section]}</td>
                {ADMIN_ROLES.map((role) => {
                  const allowed = PERMISSION_MATRIX_READONLY[section].includes(role.id);
                  return (
                    <td key={role.id} className="px-3 py-2 text-center">
                      {allowed ? (
                        <Check size={16} className="mx-auto text-esmf-success" />
                      ) : (
                        <X size={16} className="mx-auto text-esmf-border" />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
