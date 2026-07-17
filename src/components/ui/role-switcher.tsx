"use client";

import { useRole } from "@/context/role-context";
import { ADMIN_ROLES } from "@/lib/rbac/roles";
import type { AdminRoleId } from "@/types/entities";

/**
 * Sélecteur de profil admin mocké — démontre le concept RBAC multi-profil
 * (CDCF §2.2.3 / ESMF_SPEC.md §2) sans authentification réelle : changer de
 * rôle ici modifie immédiatement les sections visibles dans la navigation.
 */
export function RoleSwitcher() {
  const { role, setRole } = useRole();

  return (
    <label className="flex items-center gap-2 text-xs font-medium text-esmf-text-muted">
      <span className="hidden sm:inline">Profil connecté</span>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value as AdminRoleId)}
        className="rounded-lg border border-esmf-border bg-esmf-surface px-2.5 py-2 text-sm font-semibold text-esmf-primary outline-none focus-visible:border-esmf-primary focus-visible:ring-2 focus-visible:ring-esmf-primary/15"
      >
        {ADMIN_ROLES.map((r) => (
          <option key={r.id} value={r.id}>
            {r.label}
          </option>
        ))}
      </select>
    </label>
  );
}
