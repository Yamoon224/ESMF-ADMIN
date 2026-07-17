"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  Car,
  MapPinned,
  Wallet,
  ShieldAlert,
  Star,
  BookOpen,
  BarChart3,
  Settings,
} from "lucide-react";
import { useRole } from "@/context/role-context";
import type { NavSectionId } from "@/lib/rbac/roles";

interface NavItem {
  section: NavSectionId;
  href: string;
  label: string;
  icon: typeof LayoutDashboard;
}

const NAV_ITEMS: NavItem[] = [
  { section: "dashboard", href: "/", label: "Tableau de bord", icon: LayoutDashboard },
  { section: "utilisatrices", href: "/utilisatrices", label: "Utilisatrices", icon: Users },
  { section: "conductrices", href: "/conductrices", label: "Conductrices", icon: Car },
  { section: "courses", href: "/courses", label: "Courses en temps réel", icon: MapPinned },
  { section: "paiements", href: "/paiements", label: "Paiements", icon: Wallet },
  { section: "incidents-sos", href: "/incidents-sos", label: "Incidents & SOS", icon: ShieldAlert },
  { section: "evaluations", href: "/evaluations", label: "Évaluations", icon: Star },
  { section: "contenus-educatifs", href: "/contenus-educatifs", label: "Contenus éducatifs", icon: BookOpen },
  { section: "rapports-analyses", href: "/rapports-analyses", label: "Rapports & analyses", icon: BarChart3 },
  { section: "parametres", href: "/parametres", label: "Paramètres", icon: Settings },
];

export function SidebarNav() {
  const pathname = usePathname();
  const { canView } = useRole();

  return (
    <nav className="esmf-scroll flex h-full flex-col gap-1 overflow-y-auto p-3">
      {NAV_ITEMS.filter((item) => canView(item.section)).map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.section}
            href={item.href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
              active
                ? "bg-white text-esmf-primary shadow-sm"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon size={18} strokeWidth={2} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
