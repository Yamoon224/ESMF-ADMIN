"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRole } from "@/context/role-context";
import { NAV_ITEMS } from "@/lib/nav-items";

export function SidebarNav() {
  const pathname = usePathname();
  const { canView } = useRole();

  return (
    <nav className="esmf-scroll flex h-full flex-col gap-0.5 overflow-y-auto px-3 py-2">
      {NAV_ITEMS.filter((item) => canView(item.section)).map((item) => {
        const active = pathname === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.section}
            href={item.href}
            aria-current={active ? "page" : undefined}
            className={`relative flex items-center gap-3 rounded-lg py-2.5 pr-3 pl-4 text-[13px] font-medium transition-colors ${
              active
                ? "bg-white/10 font-semibold text-white"
                : "text-white/65 hover:bg-white/5 hover:text-white/90"
            }`}
          >
            {active && (
              <span
                aria-hidden
                className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-esmf-success"
              />
            )}
            <Icon size={17} strokeWidth={2} className={active ? "" : "opacity-80"} />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
