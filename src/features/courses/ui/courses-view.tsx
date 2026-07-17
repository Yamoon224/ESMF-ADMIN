"use client";

import { useState } from "react";
import type { Driver, Trip, User } from "@/types/entities";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { FilterSelect } from "@/components/ui/filter-select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Panel } from "@/components/ui/panel";
import { DriversAvailabilityMap } from "./drivers-availability-map";

const VEHICLE_LABEL: Record<Trip["vehicleType"], string> = {
  tricycle: "Tricycle",
  moto: "Moto",
  voiture: "Voiture",
};

function formatFcfa(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export function CoursesView({
  activeTrips,
  drivers,
  users,
}: {
  activeTrips: Trip[];
  drivers: Driver[];
  users: User[];
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [vehicleFilter, setVehicleFilter] = useState("all");

  const usersById = new Map(users.map((u) => [u.id, u]));
  const driversById = new Map(drivers.map((d) => [d.id, d]));
  const inProgressDriverIds = new Set(
    activeTrips.filter((t) => t.status === "inProgress" && t.driverId).map((t) => t.driverId as string)
  );

  const filtered = activeTrips.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (vehicleFilter !== "all" && t.vehicleType !== vehicleFilter) return false;
    return true;
  });

  const columns: DataTableColumn<Trip>[] = [
    { key: "id", header: "Course", render: (t) => t.id, sortValue: (t) => t.id },
    {
      key: "passenger",
      header: "Passagère",
      render: (t) => {
        const u = usersById.get(t.passengerId);
        return u ? `${u.firstName} ${u.lastName}` : t.passengerId;
      },
    },
    {
      key: "driver",
      header: "Conductrice",
      render: (t) => {
        if (!t.driverId) return <span className="text-esmf-text-muted">Non assignée</span>;
        const d = driversById.get(t.driverId);
        return d ? `${d.firstName} ${d.lastName}` : t.driverId;
      },
    },
    {
      key: "route",
      header: "Trajet",
      render: (t) => (
        <span>
          {t.pickup.label} <span className="text-esmf-text-muted">→</span> {t.destination.label}
        </span>
      ),
    },
    {
      key: "vehicle",
      header: "Véhicule",
      render: (t) => VEHICLE_LABEL[t.vehicleType],
      sortValue: (t) => t.vehicleType,
    },
    {
      key: "fare",
      header: "Tarif estimé",
      render: (t) => formatFcfa(t.fareEstimate),
      sortValue: (t) => t.fareEstimate,
      align: "right",
    },
    {
      key: "status",
      header: "Statut",
      render: (t) => <StatusBadge status={t.status} />,
      sortValue: (t) => t.status,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <Panel title="Carte des courses en temps réel" description="Disponibilité des conductrices">
        <DriversAvailabilityMap drivers={drivers} tripsInProgressDriverIds={inProgressDriverIds} />
      </Panel>

      <Panel title="Courses actives" description={`${filtered.length} course(s) en cours ou en attente`}>
        <div className="mb-4 flex flex-wrap gap-3">
          <FilterSelect
            label="Statut"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "Tous" },
              { value: "requesting", label: "Recherche conductrice" },
              { value: "assigned", label: "Assignée" },
              { value: "arrived", label: "Conductrice arrivée" },
              { value: "inProgress", label: "En cours" },
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
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(t) => t.id}
          searchPlaceholder="Rechercher par identifiant de course..."
          searchText={(t) => `${t.id} ${t.pickup.label} ${t.destination.label}`}
          emptyMessage="Aucune course active pour le moment."
        />
      </Panel>
    </div>
  );
}
