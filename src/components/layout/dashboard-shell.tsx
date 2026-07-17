"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { RoleProvider, useRole } from "@/context/role-context";
import { ToastProvider } from "@/context/toast-context";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { RoleSwitcher } from "@/components/ui/role-switcher";
import { NotificationsMenu } from "@/components/ui/notifications-menu";
import { SosAlertBanner } from "@/components/ui/sos-alert-banner";
import { getRoleLabel } from "@/lib/rbac/roles";

function TopBar({
  sosActiveCount,
  onOpenMobileNav,
}: {
  sosActiveCount: number;
  onOpenMobileNav: () => void;
}) {
  const { role } = useRole();

  return (
    <header className="flex h-16 flex-shrink-0 items-center justify-between gap-4 border-b border-esmf-border bg-esmf-surface px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          aria-label="Ouvrir le menu"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md border border-esmf-border text-esmf-text-muted md:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-esmf-text">
            Connecté en tant que {getRoleLabel(role)}
          </p>
          <p className="hidden truncate text-xs text-esmf-text-muted sm:block">
            ESMF — Des trajets sûrs pour les femmes ; des femmes fortes
          </p>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-3">
        <SosAlertBanner activeCount={sosActiveCount} />
        <RoleSwitcher />
        <NotificationsMenu />
      </div>
    </header>
  );
}

function BrandLink() {
  return (
    <Link href="/" className="flex items-center gap-2 px-4 py-5">
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-esmf-primary">
        E
      </span>
      <span className="text-sm font-bold leading-tight text-white">
        ESMF
        <br />
        Dashboard Admin
      </span>
    </Link>
  );
}

export function DashboardShell({
  children,
  sosActiveCount,
}: {
  children: ReactNode;
  sosActiveCount: number;
}) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <RoleProvider>
      <ToastProvider>
        <div className="flex h-full min-h-screen w-full">
          <aside className="hidden w-64 flex-shrink-0 flex-col bg-esmf-primary md:flex">
            <BrandLink />
            <SidebarNav />
          </aside>

          {mobileNavOpen && (
            <div className="fixed inset-0 z-50 flex md:hidden">
              <div
                className="absolute inset-0 bg-black/40"
                onClick={() => setMobileNavOpen(false)}
                aria-hidden
              />
              <div className="relative flex h-full w-64 flex-col bg-esmf-primary shadow-2xl">
                <BrandLink />
                <div onClick={() => setMobileNavOpen(false)}>
                  <SidebarNav />
                </div>
              </div>
            </div>
          )}

          <div className="flex min-h-screen flex-1 flex-col">
            <TopBar sosActiveCount={sosActiveCount} onOpenMobileNav={() => setMobileNavOpen(true)} />
            <main className="esmf-scroll flex-1 overflow-y-auto bg-esmf-bg p-4 sm:p-6">
              {children}
            </main>
          </div>
        </div>
      </ToastProvider>
    </RoleProvider>
  );
}
