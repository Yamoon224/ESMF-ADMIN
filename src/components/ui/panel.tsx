import type { ReactNode } from "react";

export function Panel({
  title,
  description,
  actions,
  children,
}: {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-esmf-border bg-esmf-surface p-4 shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
        <div>
          <h2 className="font-display text-sm font-bold text-esmf-text">{title}</h2>
          {description && <p className="mt-0.5 text-xs text-esmf-text-muted">{description}</p>}
        </div>
        {actions}
      </div>
      {children}
    </section>
  );
}
