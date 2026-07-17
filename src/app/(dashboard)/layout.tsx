import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getSosRepository } from "@/lib/repositories/factory";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const activeSos = await getSosRepository().getActive();

  return <DashboardShell sosActiveCount={activeSos.length}>{children}</DashboardShell>;
}
