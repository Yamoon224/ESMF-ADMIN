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
  alert: "border-esmf-alert/40 bg-esmf-alert/5",
  success: "border-esmf-success/30 bg-esmf-success/5",
};

export function KpiCard({ label, value, icon, hint, variant = "default" }: KpiCardProps) {
  return (
    <div
      className={`rounded-xl border bg-esmf-surface p-4 shadow-sm ${VARIANT_STYLES[variant]}`}
    >
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-medium text-esmf-text-muted">{label}</p>
        {icon && <span className="text-esmf-primary">{icon}</span>}
      </div>
      <p className="mt-2 text-2xl font-bold text-esmf-text">{value}</p>
      {hint && <p className="mt-1 text-xs text-esmf-text-muted">{hint}</p>}
    </div>
  );
}
