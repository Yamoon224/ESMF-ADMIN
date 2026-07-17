"use client";

import { useMemo, useState, useTransition } from "react";
import type { Driver } from "@/types/entities";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { FilterSelect } from "@/components/ui/filter-select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/context/toast-context";
import { setDriverStatus } from "../actions";

const VEHICLE_LABEL: Record<Driver["vehicleType"], string> = {
  tricycle: "Tricycle",
  moto: "Moto",
  voiture: "Voiture",
};

const DOC_LABEL: Record<"permit" | "insurance" | "criminalRecord", string> = {
  permit: "Permis de conduire",
  insurance: "Assurance",
  criminalRecord: "Casier judiciaire",
};

const MOCKED_NOW = new Date("2026-07-17T09:00:00Z");
const MS_IN_DAY = 24 * 60 * 60 * 1000;

interface ExpiringDoc {
  driver: Driver;
  document: "permit" | "insurance" | "criminalRecord";
  expiresAt: string;
}

function formatFcfa(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export function ConductricesView({
  drivers,
  expiringDocs,
}: {
  drivers: Driver[];
  expiringDocs: ExpiringDoc[];
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const selected = selectedId ? drivers.find((d) => d.id === selectedId) ?? null : null;
  const zones = useMemo(() => Array.from(new Set(drivers.map((d) => d.zone))).sort(), [drivers]);
  const pendingDrivers = drivers.filter((d) => d.status === "pending");

  const filtered = drivers.filter((d) => {
    if (statusFilter !== "all" && d.status !== statusFilter) return false;
    if (vehicleFilter !== "all" && d.vehicleType !== vehicleFilter) return false;
    if (zoneFilter !== "all" && d.zone !== zoneFilter) return false;
    return true;
  });

  function handleStatusChange(driverId: string, status: Driver["status"], message: string) {
    startTransition(async () => {
      await setDriverStatus(driverId, status);
      showToast(message, status === "active" ? "success" : status === "suspended" ? "alert" : "info");
    });
  }

  const columns: DataTableColumn<Driver>[] = [
    {
      key: "name",
      header: "Conductrice",
      render: (d) => (
        <div>
          <p className="font-medium text-esmf-text">
            {d.firstName} {d.lastName} {d.isEsmfStar && <span title="ESMF Star">⭐</span>}
          </p>
          <p className="text-xs text-esmf-text-muted">{d.phone}</p>
        </div>
      ),
      sortValue: (d) => `${d.lastName} ${d.firstName}`,
    },
    {
      key: "vehicle",
      header: "Véhicule",
      render: (d) => `${VEHICLE_LABEL[d.vehicleType]} — ${d.plate}`,
      sortValue: (d) => d.vehicleType,
    },
    { key: "zone", header: "Zone", render: (d) => d.zone, sortValue: (d) => d.zone },
    {
      key: "rating",
      header: "Note",
      render: (d) => (d.rating > 0 ? d.rating.toFixed(1) : "—"),
      sortValue: (d) => d.rating,
      align: "right",
    },
    {
      key: "online",
      header: "Disponibilité",
      render: (d) => <StatusBadge status={d.isOnline ? "online" : "offline"} />,
      sortValue: (d) => (d.isOnline ? 1 : 0),
    },
    {
      key: "status",
      header: "Statut",
      render: (d) => <StatusBadge status={d.status} />,
      sortValue: (d) => d.status,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      {expiringDocs.length > 0 && (
        <Panel
          title="Alertes documents expirés"
          description="Documents déjà expirés ou arrivant à échéance sous 30 jours"
        >
          <ul className="flex flex-col divide-y divide-esmf-border">
            {expiringDocs.map(({ driver, document, expiresAt }, i) => {
              const isExpired = new Date(expiresAt).getTime() < MOCKED_NOW.getTime();
              return (
                <li key={`${driver.id}-${document}-${i}`} className="flex flex-wrap items-center justify-between gap-2 py-2.5">
                  <span className="text-sm text-esmf-text">
                    {driver.firstName} {driver.lastName} — {DOC_LABEL[document]}
                  </span>
                  <span className="flex items-center gap-2 text-xs text-esmf-text-muted">
                    {new Date(expiresAt).toLocaleDateString("fr-FR")}
                    <StatusBadge status={isExpired ? "disabled" : "pending"} label={isExpired ? "Expiré" : "Bientôt expiré"} />
                  </span>
                </li>
              );
            })}
          </ul>
        </Panel>
      )}

      {pendingDrivers.length > 0 && (
        <Panel
          title="File d'inscription"
          description={`${pendingDrivers.length} candidature(s) en cours de vérification`}
        >
          <div className="flex flex-col gap-4">
            {pendingDrivers.map((d) => {
              const allDone = d.registrationSteps.every((s) => s.completed);
              return (
                <div key={d.id} className="rounded-lg border border-esmf-border p-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-esmf-text">
                      {d.firstName} {d.lastName} — {VEHICLE_LABEL[d.vehicleType]}
                    </p>
                    <Button
                      variant="success"
                      className="min-h-[36px] px-3 text-xs"
                      disabled={!allDone || isPending}
                      onClick={() => handleStatusChange(d.id, "active", "Conductrice activée.")}
                    >
                      Activer
                    </Button>
                  </div>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs">
                    {d.registrationSteps.map((step) => (
                      <li
                        key={step.label}
                        className={step.completed ? "text-esmf-success" : "text-esmf-text-muted"}
                      >
                        {step.completed ? "✓" : "○"} {step.label}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </Panel>
      )}

      <Panel title="Toutes les conductrices" description={`${filtered.length} conductrice(s)`}>
        <div className="mb-4 flex flex-wrap gap-3">
          <FilterSelect
            label="Statut"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "Tous" },
              { value: "active", label: "Active" },
              { value: "pending", label: "En attente" },
              { value: "suspended", label: "Suspendue" },
            ]}
          />
          <FilterSelect
            label="Véhicule"
            value={vehicleFilter}
            onChange={setVehicleFilter}
            options={[
              { value: "all", label: "Tous" },
              { value: "tricycle", label: "Tricycle" },
              { value: "moto", label: "Moto" },
              { value: "voiture", label: "Voiture" },
            ]}
          />
          <FilterSelect
            label="Zone"
            value={zoneFilter}
            onChange={setZoneFilter}
            options={[{ value: "all", label: "Toutes" }, ...zones.map((z) => ({ value: z, label: z }))]}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(d) => d.id}
          searchPlaceholder="Rechercher par nom ou numéro..."
          searchText={(d) => `${d.firstName} ${d.lastName} ${d.phone} ${d.plate}`}
          onRowClick={(d) => setSelectedId(d.id)}
        />
      </Panel>

      <Drawer
        open={!!selected}
        onClose={() => setSelectedId(null)}
        title={selected ? `${selected.firstName} ${selected.lastName}` : ""}
        subtitle={selected?.phone}
      >
        {selected && (
          <div className="flex flex-col gap-5 text-sm">
            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Identité & véhicule</p>
              <p className="mt-1">CIN : {selected.cin}</p>
              <p>Permis : catégorie {selected.licenseCategory}</p>
              <p>Véhicule : {VEHICLE_LABEL[selected.vehicleType]} — {selected.plate}</p>
              <p>Zone : {selected.zone}</p>
              <p className="mt-1 flex items-center gap-2">
                Statut : <StatusBadge status={selected.status} />
                {selected.isEsmfStar && <StatusBadge status="active" label="ESMF Star ⭐" />}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Documents</p>
              <ul className="mt-1 flex flex-col gap-1">
                <li>Permis — expire le {new Date(selected.documentsExpiry.permit).toLocaleDateString("fr-FR")}</li>
                <li>Assurance — expire le {new Date(selected.documentsExpiry.insurance).toLocaleDateString("fr-FR")}</li>
                <li>Casier judiciaire — expire le {new Date(selected.documentsExpiry.criminalRecord).toLocaleDateString("fr-FR")}</li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Formations suivies</p>
              {selected.trainingCompleted.length > 0 ? (
                <ul className="mt-1 list-inside list-disc">
                  {selected.trainingCompleted.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : (
                <p className="mt-1 text-esmf-text-muted">Aucune formation complétée.</p>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Contrat</p>
              <p className="mt-1">
                {selected.contractSignedAt
                  ? `Signé le ${new Date(selected.contractSignedAt).toLocaleDateString("fr-FR")}`
                  : "Non signé"}
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Statistiques</p>
              <p className="mt-1">Note moyenne : {selected.rating > 0 ? selected.rating.toFixed(1) : "—"} / 5</p>
              <p>Note sur 20 dernières courses : {selected.last20RatingsAvg > 0 ? selected.last20RatingsAvg.toFixed(1) : "—"}</p>
              <p>Gains du mois : {formatFcfa(selected.monthlyEarnings)}</p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Actions</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.status !== "active" && (
                  <Button
                    variant="success"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleStatusChange(selected.id, "active", "Conductrice activée.")}
                  >
                    Activer
                  </Button>
                )}
                {selected.status !== "suspended" && (
                  <Button
                    variant="alert"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleStatusChange(selected.id, "suspended", "Conductrice suspendue.")}
                  >
                    Suspendre
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
}
