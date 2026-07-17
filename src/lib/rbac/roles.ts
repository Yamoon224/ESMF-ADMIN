import type { AdminRoleDefinition, AdminRoleId } from "@/types/entities";

/**
 * 6 profils admin (ESMF_SPEC.md §2.2.3 CDCF / multi-profil).
 * Ceci mocke le RBAC : aucune authentification réelle, seulement une
 * démonstration de la logique de visibilité conditionnelle des sections.
 */
export const ADMIN_ROLES: AdminRoleDefinition[] = [
  {
    id: "super_admin",
    label: "Super Admin",
    description: "Accès complet à toutes les sections et paramètres.",
  },
  {
    id: "regional_admin",
    label: "Admin régional",
    description: "Supervision opérationnelle d'une région (Cotonou, Calavi...).",
  },
  {
    id: "supervisor",
    label: "Superviseur",
    description: "Suivi temps réel des courses et des incidents.",
  },
  {
    id: "field_coordinator",
    label: "Coordinatrice terrain",
    description: "Gestion des alertes SOS et vérification des conductrices.",
  },
  {
    id: "data_analyst",
    label: "Analyste données",
    description: "Rapports, analyses et indicateurs de performance.",
  },
  {
    id: "customer_support",
    label: "Support client",
    description: "Assistance utilisatrices/conductrices et litiges non-SOS.",
  },
];

export type NavSectionId =
  | "dashboard"
  | "utilisatrices"
  | "conductrices"
  | "courses"
  | "paiements"
  | "incidents-sos"
  | "evaluations"
  | "contenus-educatifs"
  | "rapports-analyses"
  | "parametres";

/**
 * Matrice de permissions section x rôle. `true` = section visible dans la
 * navigation pour ce rôle. Ceci est un mock illustratif du concept RBAC, pas
 * une politique de sécurité réelle (aucune donnée n'est réellement protégée
 * côté serveur à ce stade).
 */
const PERMISSION_MATRIX: Record<NavSectionId, AdminRoleId[]> = {
  dashboard: [
    "super_admin",
    "regional_admin",
    "supervisor",
    "field_coordinator",
    "data_analyst",
    "customer_support",
  ],
  utilisatrices: ["super_admin", "regional_admin", "customer_support"],
  conductrices: [
    "super_admin",
    "regional_admin",
    "field_coordinator",
    "customer_support",
  ],
  courses: ["super_admin", "regional_admin", "supervisor"],
  paiements: ["super_admin", "regional_admin", "data_analyst"],
  "incidents-sos": [
    "super_admin",
    "regional_admin",
    "supervisor",
    "field_coordinator",
    "customer_support",
  ],
  evaluations: ["super_admin", "regional_admin", "supervisor", "customer_support"],
  "contenus-educatifs": ["super_admin", "regional_admin", "data_analyst"],
  "rapports-analyses": ["super_admin", "regional_admin", "data_analyst"],
  parametres: ["super_admin"],
};

export function isSectionVisible(section: NavSectionId, role: AdminRoleId): boolean {
  return PERMISSION_MATRIX[section].includes(role);
}

export function getVisibleSections(role: AdminRoleId): NavSectionId[] {
  return (Object.keys(PERMISSION_MATRIX) as NavSectionId[]).filter((section) =>
    isSectionVisible(section, role)
  );
}

export function getRoleLabel(role: AdminRoleId): string {
  return ADMIN_ROLES.find((r) => r.id === role)?.label ?? role;
}

export const PERMISSION_MATRIX_READONLY = PERMISSION_MATRIX;
