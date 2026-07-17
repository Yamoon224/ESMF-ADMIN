const STATUS_STYLES: Record<string, string> = {
  // Générique
  active: "bg-esmf-success/10 text-esmf-success",
  online: "bg-esmf-success/10 text-esmf-success",
  confirmed: "bg-esmf-success/10 text-esmf-success",
  completed: "bg-esmf-success/10 text-esmf-success",
  approved: "bg-esmf-success/10 text-esmf-success",
  resolved: "bg-esmf-success/10 text-esmf-success",
  published: "bg-esmf-success/10 text-esmf-success",
  closed: "bg-esmf-success/10 text-esmf-success",

  pending: "bg-esmf-secondary/15 text-esmf-secondary",
  requesting: "bg-esmf-secondary/15 text-esmf-secondary",
  assigned: "bg-esmf-secondary/15 text-esmf-secondary",
  arrived: "bg-esmf-secondary/15 text-esmf-secondary",
  inProgress: "bg-esmf-secondary/15 text-esmf-secondary",
  open: "bg-esmf-secondary/15 text-esmf-secondary",
  draft: "bg-esmf-secondary/15 text-esmf-secondary",
  offline: "bg-gray-200 text-esmf-text-muted",

  suspended: "bg-esmf-alert/10 text-esmf-alert",
  disabled: "bg-esmf-alert/10 text-esmf-alert",
  cancelled: "bg-esmf-alert/10 text-esmf-alert",
  failed: "bg-esmf-alert/10 text-esmf-alert",
  rejected: "bg-esmf-alert/10 text-esmf-alert",
  falseAlarm: "bg-gray-200 text-esmf-text-muted",
  none: "bg-gray-100 text-esmf-text-muted",
};

const STATUS_LABELS: Record<string, string> = {
  active: "Active",
  online: "En ligne",
  confirmed: "Confirmé",
  completed: "Terminé",
  approved: "Approuvée",
  resolved: "Résolue",
  published: "Publié",
  closed: "Clôturé",
  pending: "En attente",
  requesting: "Recherche conductrice",
  assigned: "Assignée",
  arrived: "Conductrice arrivée",
  inProgress: "En cours",
  open: "Ouvert",
  draft: "Brouillon",
  offline: "Hors ligne",
  suspended: "Suspendue",
  disabled: "Désactivé",
  cancelled: "Annulée",
  failed: "Échoué",
  rejected: "Rejetée",
  falseAlarm: "Fausse alerte",
  none: "Aucune",
};

export function StatusBadge({ status, label }: { status: string; label?: string }) {
  const classes = STATUS_STYLES[status] ?? "bg-gray-100 text-esmf-text-muted";
  const text = label ?? STATUS_LABELS[status] ?? status;

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold whitespace-nowrap ${classes}`}
    >
      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-current" />
      {text}
    </span>
  );
}
