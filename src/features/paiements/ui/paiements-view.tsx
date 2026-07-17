"use client";

import { useState } from "react";
import type { Payment } from "@/types/entities";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { FilterSelect } from "@/components/ui/filter-select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Panel } from "@/components/ui/panel";
import { RevenueTrendChart } from "./revenue-trend-chart";
import { MethodBreakdownChart } from "./method-breakdown-chart";

const METHOD_LABEL: Record<Payment["method"], string> = {
  mtn: "MTN Mobile Money",
  moov: "Moov Money",
  celtis: "Celtis Cash",
  orange: "Orange Money",
  cash: "Espèces",
};

function formatFcfa(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export function PaiementsView({
  payments,
  revenueTrend,
  methodBreakdown,
}: {
  payments: Payment[];
  revenueTrend: { date: string; revenue: number }[];
  methodBreakdown: { method: string; amount: number }[];
}) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [methodFilter, setMethodFilter] = useState("all");

  const filtered = payments.filter((p) => {
    if (statusFilter !== "all" && p.status !== statusFilter) return false;
    if (methodFilter !== "all" && p.method !== methodFilter) return false;
    return true;
  });

  const columns: DataTableColumn<Payment>[] = [
    { key: "id", header: "Transaction", render: (p) => p.id, sortValue: (p) => p.id },
    { key: "trip", header: "Course", render: (p) => p.tripId, sortValue: (p) => p.tripId },
    {
      key: "amount",
      header: "Montant",
      render: (p) => formatFcfa(p.amount),
      sortValue: (p) => p.amount,
      align: "right",
    },
    {
      key: "method",
      header: "Méthode",
      render: (p) => METHOD_LABEL[p.method],
      sortValue: (p) => p.method,
    },
    {
      key: "split",
      header: "Répartition (conductrice / ESMF / social)",
      render: (p) => (
        <span className="text-xs text-esmf-text-muted">
          {formatFcfa(p.driverShare)} / {formatFcfa(p.esmfOperationsShare)} / {formatFcfa(p.esmfSocialShare)}
        </span>
      ),
    },
    {
      key: "status",
      header: "Statut",
      render: (p) => <StatusBadge status={p.status} />,
      sortValue: (p) => p.status,
    },
    {
      key: "date",
      header: "Date",
      render: (p) => new Date(p.createdAt).toLocaleDateString("fr-FR"),
      sortValue: (p) => p.createdAt,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Panel title="Évolution du revenu" description="Paiements confirmés, par jour">
          <RevenueTrendChart data={revenueTrend} />
        </Panel>
        <Panel title="Répartition par méthode de paiement" description="Montants confirmés">
          <MethodBreakdownChart data={methodBreakdown} />
        </Panel>
      </div>

      <Panel title="Transactions" description={`${filtered.length} transaction(s)`}>
        <div className="mb-4 flex flex-wrap gap-3">
          <FilterSelect
            label="Statut"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "Tous" },
              { value: "confirmed", label: "Confirmé" },
              { value: "pending", label: "En attente" },
              { value: "failed", label: "Échoué" },
            ]}
          />
          <FilterSelect
            label="Méthode"
            value={methodFilter}
            onChange={setMethodFilter}
            options={[
              { value: "all", label: "Toutes" },
              { value: "mtn", label: "MTN Mobile Money" },
              { value: "moov", label: "Moov Money" },
              { value: "celtis", label: "Celtis Cash" },
              { value: "orange", label: "Orange Money" },
              { value: "cash", label: "Espèces" },
            ]}
          />
        </div>
        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(p) => p.id}
          searchPlaceholder="Rechercher par identifiant de transaction ou course..."
          searchText={(p) => `${p.id} ${p.tripId}`}
        />
      </Panel>
    </div>
  );
}
