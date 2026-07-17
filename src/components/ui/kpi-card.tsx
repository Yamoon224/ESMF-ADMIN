import type { ReactNode } from "react";

interface KpiCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  hint?: string;
  variant?: "default" | "alert" | "success";
}

const VARIANT_STYLES: Record<NonNullable<KpiCardProps["variant"]>, string> = {
  default: "border-esmf-border",
  alert: "border-esmf-alert/30 bg-esmf-alert/5",
  success: "border-esmf-success/25 bg-esmf-success/5",
};

const VARIANT_CHEVRON: Record<NonNullable<KpiCardProps["variant"]>, string> = {
  default: "var(--esmf-secondary)",
  alert: "var(--esmf-alert)",
  success: "var(--esmf-success)",
};

/** Small chevron corner mark — the logo's own geometry, reused as the card's signature. */
function CornerChevron({ fill }: { fill: string }) {
  return (
    <svg
      aria-hidden
      width="18"
      height="18"
      viewBox="0 0 100 100"
      className="absolute right-3 top-3 opacity-90"
    >
      <path d="M50 20 L68 32 L50 44 L32 32 Z" fill={fill} />
    </svg>
  );
}

export function KpiCard({ label, value, icon, hint, variant = "default" }: KpiCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border bg-esmf-surface p-5 shadow-sm ${VARIANT_STYLES[variant]}`}
    >
      <CornerChevron fill={VARIANT_CHEVRON[variant]} />
      <div className="flex items-start justify-between gap-2 pr-5">
        <p className="text-[11.5px] font-semibold text-esmf-text-muted">{label}</p>
        {icon && <span className="text-esmf-primary">{icon}</span>}
      </div>
      <p className="font-display mt-2 text-[26px] font-bold tabular-nums text-esmf-text">{value}</p>
      {hint && <p className="mt-1.5 text-xs text-esmf-text-muted">{hint}</p>}
    </div>
  );
}
