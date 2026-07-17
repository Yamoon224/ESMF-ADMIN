"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { RoleProvider, useRole } from "@/context/role-context";
import { ToastProvider } from "@/context/toast-context";
import { SidebarNav } from "@/components/ui/sidebar-nav";
import { MobileTabBar } from "@/components/ui/mobile-tab-bar";
import { BrandLockup } from "@/components/ui/brand-mark";
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
    <header className="flex h-16 flex-shrink-0 items-center justify-between gap-3 border-b border-esmf-border bg-esmf-surface px-4 sm:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onOpenMobileNav}
          aria-label="Ouvrir le menu"
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg border border-esmf-border text-esmf-text-muted transition-colors hover:bg-esmf-bg md:hidden"
        >
          <Menu size={18} />
        </button>
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-esmf-text">
            Connectée en tant que {getRoleLabel(role)}
          </p>
          <p className="hidden truncate text-xs text-esmf-text-muted sm:block">
            ESMF — Des trajets sûrs pour les femmes ; des femmes fortes
          </p>
        </div>
      </div>
      <div className="flex flex-shrink-0 items-center gap-2.5">
        <SosAlertBanner activeCount={sosActiveCount} />
        <RoleSwitcher />
        <NotificationsMenu />
      </div>
    </header>
  );
}

function BrandLink({ onClose }: { onClose?: () => void }) {
  return (
    <Link href="/" onClick={onClose} className="block px-4 py-5">
      <BrandLockup />
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
        <div className="flex h-full min-h-screen w-full overflow-x-hidden">
          <aside className="hidden w-64 flex-shrink-0 flex-col bg-gradient-to-b from-esmf-primary to-esmf-primary-dark md:flex">
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
              <div className="relative flex h-full w-72 flex-col bg-gradient-to-b from-esmf-primary to-esmf-primary-dark shadow-2xl">
                <div className="flex items-center justify-between pr-3">
                  <BrandLink onClose={() => setMobileNavOpen(false)} />
                  <button
                    type="button"
                    onClick={() => setMobileNavOpen(false)}
                    aria-label="Fermer le menu"
                    className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>
                <div onClick={() => setMobileNavOpen(false)} className="flex-1 overflow-y-auto">
                  <SidebarNav />
                </div>
              </div>
            </div>
          )}

          <div className="flex min-h-screen min-w-0 flex-1 flex-col">
            <TopBar sosActiveCount={sosActiveCount} onOpenMobileNav={() => setMobileNavOpen(true)} />
            <main className="esmf-scroll min-w-0 flex-1 overflow-x-hidden overflow-y-auto bg-esmf-bg p-4 pb-20 sm:p-6 md:pb-6">
              {children}
            </main>
            <MobileTabBar onOpenMore={() => setMobileNavOpen(true)} />
          </div>
        </div>
      </ToastProvider>
    </RoleProvider>
  );
}
