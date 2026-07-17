"use client";

import { useTransition } from "react";
import type { Driver, DriverReview } from "@/types/entities";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { Panel } from "@/components/ui/panel";
import { Button } from "@/components/ui/button";
import { useToast } from "@/context/toast-context";
import { setDriverStatus } from "@/features/conductrices/actions";

const LOW_RATING_THRESHOLD = 3.5;

function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-esmf-secondary" aria-label={`${rating} sur 5`}>
      {"★".repeat(Math.round(rating))}
      <span className="text-esmf-border">{"★".repeat(5 - Math.round(rating))}</span>
    </span>
  );
}

export function EvaluationsView({
  flaggedDrivers,
  reviews,
  driversById,
}: {
  flaggedDrivers: Driver[];
  reviews: DriverReview[];
  driversById: Map<string, Driver>;
}) {
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  function handleSuspend(driverId: string) {
    startTransition(async () => {
      await setDriverStatus(driverId, "suspended");
      showToast("Conductrice suspendue automatiquement (note < 3,5).", "alert");
    });
  }

  const reviewColumns: DataTableColumn<DriverReview>[] = [
    {
      key: "driver",
      header: "Conductrice",
      render: (r) => {
        const d = driversById.get(r.driverId);
        return d ? `${d.firstName} ${d.lastName}` : r.driverId;
      },
    },
    { key: "trip", header: "Course", render: (r) => r.tripId },
    {
      key: "rating",
      header: "Note",
      render: (r) => <Stars rating={r.rating} />,
      sortValue: (r) => r.rating,
    },
    {
      key: "comment",
      header: "Commentaire",
      render: (r) => <span className="text-xs text-esmf-text-muted">{r.comment ?? "—"}</span>,
    },
    {
      key: "date",
      header: "Date",
      render: (r) => new Date(r.createdAt).toLocaleDateString("fr-FR"),
      sortValue: (r) => r.createdAt,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Panel
        title="Conductrices à surveiller"
        description={`Note moyenne < ${LOW_RATING_THRESHOLD} sur les 20 dernières courses → suspension automatique`}
      >
        {flaggedDrivers.length === 0 ? (
          <p className="text-sm text-esmf-text-muted">Aucune conductrice sous le seuil actuellement.</p>
        ) : (
          <ul className="flex flex-col divide-y divide-esmf-border">
            {flaggedDrivers.map((d) => (
              <li key={d.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium text-esmf-text">
                    {d.firstName} {d.lastName}
                  </p>
                  <p className="text-xs text-esmf-text-muted">
                    Note sur 20 dernières courses : {d.last20RatingsAvg.toFixed(1)} / 5
                  </p>
                </div>
                <Button
                  variant="alert"
                  className="min-h-[36px] px-3 text-xs"
                  disabled={isPending || d.status === "suspended"}
                  onClick={() => handleSuspend(d.id)}
                >
                  {d.status === "suspended" ? "Déjà suspendue" : "Suspendre maintenant"}
                </Button>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel title="Historique des avis" description={`${reviews.length} avis enregistré(s)`}>
        <DataTable
          columns={reviewColumns}
          data={reviews}
          rowKey={(r) => r.id}
          searchPlaceholder="Rechercher par course..."
          searchText={(r) => `${r.tripId} ${r.comment ?? ""}`}
        />
      </Panel>
    </div>
  );
}
