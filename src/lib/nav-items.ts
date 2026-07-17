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
  type LucideIcon,
} from "lucide-react";
import type { NavSectionId } from "@/lib/rbac/roles";

export interface NavItem {
  section: NavSectionId;
  href: string;
  label: string;
  shortLabel: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { section: "dashboard", href: "/", label: "Tableau de bord", shortLabel: "Accueil", icon: LayoutDashboard },
  { section: "utilisatrices", href: "/utilisatrices", label: "Utilisatrices", shortLabel: "Utilisatrices", icon: Users },
  { section: "conductrices", href: "/conductrices", label: "Conductrices", shortLabel: "Conductrices", icon: Car },
  { section: "courses", href: "/courses", label: "Courses en temps réel", shortLabel: "Courses", icon: MapPinned },
  { section: "paiements", href: "/paiements", label: "Paiements", shortLabel: "Paiements", icon: Wallet },
  { section: "incidents-sos", href: "/incidents-sos", label: "Incidents & SOS", shortLabel: "Incidents", icon: ShieldAlert },
  { section: "evaluations", href: "/evaluations", label: "Évaluations", shortLabel: "Évaluations", icon: Star },
  { section: "contenus-educatifs", href: "/contenus-educatifs", label: "Contenus éducatifs", shortLabel: "Contenus", icon: BookOpen },
  { section: "rapports-analyses", href: "/rapports-analyses", label: "Rapports & analyses", shortLabel: "Rapports", icon: BarChart3 },
  { section: "parametres", href: "/parametres", label: "Paramètres", shortLabel: "Paramètres", icon: Settings },
];

/** The 3 sections reachable in one tap from the mobile bottom tab bar; the rest live behind "Plus". */
export const MOBILE_PRIMARY_SECTIONS: NavSectionId[] = ["dashboard", "utilisatrices", "incidents-sos"];
