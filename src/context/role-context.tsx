"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";
import type { AdminRoleId } from "@/types/entities";
import { getVisibleSections, isSectionVisible, type NavSectionId } from "@/lib/rbac/roles";

interface RoleContextValue {
  role: AdminRoleId;
  setRole: (role: AdminRoleId) => void;
  visibleSections: NavSectionId[];
  canView: (section: NavSectionId) => boolean;
}

const RoleContext = createContext<RoleContextValue | undefined>(undefined);

const DEFAULT_ROLE: AdminRoleId = "super_admin";

export function RoleProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<AdminRoleId>(DEFAULT_ROLE);

  const value = useMemo<RoleContextValue>(
    () => ({
      role,
      setRole,
      visibleSections: getVisibleSections(role),
      canView: (section: NavSectionId) => isSectionVisible(section, role),
    }),
    [role]
  );

  return <RoleContext.Provider value={value}>{children}</RoleContext.Provider>;
}

export function useRole(): RoleContextValue {
  const ctx = useContext(RoleContext);
  if (!ctx) throw new Error("useRole doit être utilisé dans un RoleProvider");
  return ctx;
}
