"use client";

import { useState, useTransition } from "react";
import type { Incident } from "@/types/entities";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { FilterSelect } from "@/components/ui/filter-select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/context/toast-context";
import { setIncidentStatus } from "../actions";

const TYPE_LABEL: Record<Incident["type"], string> = {
  harassment: "Harcèlement",
  tariff: "Litige tarifaire",
  payment: "Paiement",
  accident: "Accident",
  complaint: "Réclamation",
};

const MOCKED_NOW = new Date("2026-07-17T09:00:00Z");

type SlaState = "overdue" | "soon" | "ok" | "closed";

function slaStateOf(incident: Incident): SlaState {
  if (incident.status === "closed") return "closed";
  const deadline = new Date(incident.slaDeadline).getTime();
  const hoursLeft = (deadline - MOCKED_NOW.getTime()) / (1000 * 60 * 60);
  if (hoursLeft < 0) return "overdue";
  if (hoursLeft <= 24) return "soon";
  return "ok";
}

const SLA_LABEL: Record<SlaState, string> = {
  overdue: "SLA dépassé",
  soon: "SLA proche",
  ok: "Dans les délais",
  closed: "Clôturé",
};

const SLA_STATUS_KEY: Record<SlaState, string> = {
  overdue: "disabled",
  soon: "pending",
  ok: "active",
  closed: "closed",
};

export function IncidentsTable({ incidents }: { incidents: Incident[] }) {
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();

  const filtered = incidents.filter((i) => {
    if (typeFilter !== "all" && i.type !== typeFilter) return false;
    if (statusFilter !== "all" && i.status !== statusFilter) return false;
    return true;
  });

  function advanceStatus(incident: Incident) {
    const next: Incident["status"] = incident.status === "open" ? "inProgress" : "closed";
    startTransition(async () => {
      await setIncidentStatus(incident.id, next);
      showToast(
        next === "closed" ? "Incident clôturé." : "Incident pris en charge.",
        next === "closed" ? "success" : "info"
      );
    });
  }

  const columns: DataTableColumn<Incident>[] = [
    { key: "id", header: "Incident", render: (i) => i.id, sortValue: (i) => i.id },
    {
      key: "type",
      header: "Type",
      render: (i) => TYPE_LABEL[i.type],
      sortValue: (i) => i.type,
    },
    {
      key: "description",
      header: "Description",
      render: (i) => <span className="line-clamp-2 max-w-xs text-xs">{i.description}</span>,
    },
    {
      key: "status",
      header: "Statut",
      render: (i) => <StatusBadge status={i.status} />,
      sortValue: (i) => i.status,
    },
    {
      key: "sla",
      header: "SLA",
      render: (i) => {
        const state = slaStateOf(i);
        return <StatusBadge status={SLA_STATUS_KEY[state]} label={SLA_LABEL[state]} />;
      },
      sortValue: (i) => new Date(i.slaDeadline).getTime(),
    },
    {
      key: "actions",
      header: "Actions",
      render: (i) =>
        i.status !== "closed" ? (
          <Button
            variant="ghost"
            className="min-h-[32px] px-3 text-xs"
            disabled={isPending}
            onClick={() => advanceStatus(i)}
          >
            {i.status === "open" ? "Prendre en charge" : "Clôturer"}
          </Button>
        ) : (
          <span className="text-xs text-esmf-text-muted">—</span>
        ),
    },
  ];

  return (
    <Panel title="Incidents & litiges" description={`${filtered.length} incident(s)`}>
      <div className="mb-4 flex flex-wrap gap-3">
        <FilterSelect
          label="Type"
          value={typeFilter}
          onChange={setTypeFilter}
          options={[
            { value: "all", label: "Tous" },
            { value: "harassment", label: "Harcèlement" },
            { value: "tariff", label: "Litige tarifaire" },
            { value: "payment", label: "Paiement" },
            { value: "accident", label: "Accident" },
            { value: "complaint", label: "Réclamation" },
          ]}
        />
        <FilterSelect
          label="Statut"
          value={statusFilter}
          onChange={setStatusFilter}
          options={[
            { value: "all", label: "Tous" },
            { value: "open", label: "Ouvert" },
            { value: "inProgress", label: "En cours" },
            { value: "closed", label: "Clôturé" },
          ]}
        />
      </div>
      <DataTable
        columns={columns}
        data={filtered}
        rowKey={(i) => i.id}
        searchPlaceholder="Rechercher dans la description..."
        searchText={(i) => `${i.id} ${i.description}`}
      />
    </Panel>
  );
}
