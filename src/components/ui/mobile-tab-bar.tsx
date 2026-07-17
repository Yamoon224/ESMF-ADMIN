"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MoreHorizontal } from "lucide-react";
import { useRole } from "@/context/role-context";
import { NAV_ITEMS, MOBILE_PRIMARY_SECTIONS } from "@/lib/nav-items";

type MobileTabBarProps = {
  onOpenMore: () => void;
};

/**
 * Reachability-first mobile nav: the 3 most-used sections stay one tap away,
 * everything else lives behind "Plus" (opens the same drawer as the hamburger).
 */
export function MobileTabBar({ onOpenMore }: MobileTabBarProps) {
  const pathname = usePathname();
  const { canView } = useRole();

  const primaryItems = NAV_ITEMS.filter(
    (item) => MOBILE_PRIMARY_SECTIONS.includes(item.section) && canView(item.section)
  );

  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-30 flex items-stretch justify-around border-t border-esmf-border bg-esmf-surface pb-[env(safe-area-inset-bottom)] md:hidden"
    >
      {primaryItems.map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.section}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className="flex min-w-[64px] flex-1 flex-col items-center justify-center gap-1 py-2 text-[10.5px] font-semibold"
          >
            <Icon
              size={19}
              strokeWidth={2}
              className={active ? "text-esmf-success" : "text-esmf-text-muted"}
            />
            <span className={active ? "text-esmf-primary" : "text-esmf-text-muted"}>
              {item.shortLabel}
            </span>
          </Link>
        );
      })}
      <button
        type="button"
        onClick={onOpenMore}
        className="flex min-w-[64px] flex-1 flex-col items-center justify-center gap-1 py-2 text-[10.5px] font-semibold text-esmf-text-muted"
      >
        <MoreHorizontal size={19} strokeWidth={2} />
        Plus
      </button>
    </nav>
  );
}
