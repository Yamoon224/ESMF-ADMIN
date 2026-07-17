"use client";

import { useMemo, useState, useTransition } from "react";
import type { User } from "@/types/entities";
import { DataTable, type DataTableColumn } from "@/components/ui/data-table";
import { FilterSelect } from "@/components/ui/filter-select";
import { StatusBadge } from "@/components/ui/status-badge";
import { Drawer } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { useToast } from "@/context/toast-context";
import { approveStudentMode, rejectStudentMode, setUserStatus } from "../actions";

const ACCOUNT_TYPE_LABEL: Record<User["accountType"], string> = {
  standard: "Standard",
  student: "Étudiante",
  withChildren: "Avec compte(s) enfant",
};

export function UtilisatricesView({ users }: { users: User[] }) {
  const [statusFilter, setStatusFilter] = useState("all");
  const [zoneFilter, setZoneFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const { showToast } = useToast();
  const selected = selectedId ? users.find((u) => u.id === selectedId) ?? null : null;

  const zones = useMemo(() => Array.from(new Set(users.map((u) => u.zone))).sort(), [users]);
  const pendingStudents = users.filter((u) => u.studentVerificationStatus === "pending");

  const filtered = users.filter((u) => {
    if (statusFilter !== "all" && u.status !== statusFilter) return false;
    if (zoneFilter !== "all" && u.zone !== zoneFilter) return false;
    if (typeFilter !== "all" && u.accountType !== typeFilter) return false;
    return true;
  });

  const columns: DataTableColumn<User>[] = [
    {
      key: "name",
      header: "Nom",
      render: (u) => (
        <div>
          <p className="font-medium text-esmf-text">
            {u.firstName} {u.lastName}
          </p>
          <p className="text-xs text-esmf-text-muted">{u.phone}</p>
        </div>
      ),
      sortValue: (u) => `${u.lastName} ${u.firstName}`,
    },
    {
      key: "type",
      header: "Type de compte",
      render: (u) => ACCOUNT_TYPE_LABEL[u.accountType],
      sortValue: (u) => u.accountType,
    },
    { key: "zone", header: "Zone", render: (u) => u.zone, sortValue: (u) => u.zone },
    {
      key: "points",
      header: "Points",
      render: (u) => u.loyaltyPoints,
      sortValue: (u) => u.loyaltyPoints,
      align: "right",
    },
    {
      key: "status",
      header: "Statut",
      render: (u) => <StatusBadge status={u.status} />,
      sortValue: (u) => u.status,
    },
  ];

  function handleApprove(userId: string) {
    startTransition(async () => {
      await approveStudentMode(userId);
      showToast("Mode Étudiante approuvé.", "success");
    });
  }

  function handleReject(userId: string) {
    startTransition(async () => {
      await rejectStudentMode(userId);
      showToast("Demande Mode Étudiante rejetée.", "alert");
    });
  }

  function handleStatusChange(userId: string, status: User["status"]) {
    startTransition(async () => {
      await setUserStatus(userId, status);
      showToast("Statut de l'utilisatrice mis à jour.", "info");
    });
  }

  return (
    <div className="flex flex-col gap-6">
      {pendingStudents.length > 0 && (
        <Panel
          title="File de validation Mode Étudiante"
          description={`${pendingStudents.length} demande(s) en attente de vérification`}
        >
          <ul className="flex flex-col divide-y divide-esmf-border">
            {pendingStudents.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div>
                  <p className="text-sm font-medium text-esmf-text">
                    {u.firstName} {u.lastName} — {u.zone}
                  </p>
                  <p className="text-xs text-esmf-text-muted">
                    Carte étudiante : {u.studentCardUrl ?? "non fournie"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="success"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleApprove(u.id)}
                  >
                    Approuver
                  </Button>
                  <Button
                    variant="alert"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleReject(u.id)}
                  >
                    Rejeter
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        </Panel>
      )}

      <Panel title="Toutes les utilisatrices" description={`${filtered.length} compte(s)`}>
        <div className="mb-4 flex flex-wrap gap-3">
          <FilterSelect
            label="Statut"
            value={statusFilter}
            onChange={setStatusFilter}
            options={[
              { value: "all", label: "Tous" },
              { value: "active", label: "Active" },
              { value: "suspended", label: "Suspendue" },
              { value: "disabled", label: "Désactivé" },
            ]}
          />
          <FilterSelect
            label="Zone"
            value={zoneFilter}
            onChange={setZoneFilter}
            options={[{ value: "all", label: "Toutes" }, ...zones.map((z) => ({ value: z, label: z }))]}
          />
          <FilterSelect
            label="Type de compte"
            value={typeFilter}
            onChange={setTypeFilter}
            options={[
              { value: "all", label: "Tous" },
              { value: "standard", label: "Standard" },
              { value: "student", label: "Étudiante" },
              { value: "withChildren", label: "Avec compte(s) enfant" },
            ]}
          />
        </div>

        <DataTable
          columns={columns}
          data={filtered}
          rowKey={(u) => u.id}
          searchPlaceholder="Rechercher par nom ou numéro..."
          searchText={(u) => `${u.firstName} ${u.lastName} ${u.phone}`}
          onRowClick={(u) => setSelectedId(u.id)}
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
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Compte</p>
              <p className="mt-1">Type : {ACCOUNT_TYPE_LABEL[selected.accountType]}</p>
              <p>Zone : {selected.zone}</p>
              <p>
                Créée le {new Date(selected.createdAt).toLocaleDateString("fr-FR")}
              </p>
              <p>Points de fidélité : {selected.loyaltyPoints}</p>
              <p className="mt-1 flex items-center gap-2">
                Statut : <StatusBadge status={selected.status} />
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">
                Contacts d&apos;urgence
              </p>
              <ul className="mt-1 flex flex-col gap-1">
                {selected.emergencyContacts.map((c, i) => (
                  <li key={i}>
                    {c.name} — {c.phone}
                  </li>
                ))}
              </ul>
            </div>

            {selected.childAccounts.length > 0 && (
              <div>
                <p className="text-xs font-semibold uppercase text-esmf-text-muted">
                  Comptes enfants
                </p>
                <ul className="mt-1 flex flex-col gap-1">
                  {selected.childAccounts.map((c) => (
                    <li key={c.id}>
                      {c.firstName} {c.lastName}, {c.age} ans — {c.school}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">
                Mode Étudiante
              </p>
              <p className="mt-1 flex items-center gap-2">
                Statut : <StatusBadge status={selected.studentVerificationStatus} />
              </p>
              {selected.studentVerificationStatus === "pending" && (
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="success"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleApprove(selected.id)}
                  >
                    Approuver
                  </Button>
                  <Button
                    variant="alert"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleReject(selected.id)}
                  >
                    Rejeter
                  </Button>
                </div>
              )}
            </div>

            <div>
              <p className="text-xs font-semibold uppercase text-esmf-text-muted">Actions</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {selected.status !== "active" && (
                  <Button
                    variant="success"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleStatusChange(selected.id, "active")}
                  >
                    Réactiver
                  </Button>
                )}
                {selected.status !== "suspended" && (
                  <Button
                    variant="secondary"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleStatusChange(selected.id, "suspended")}
                  >
                    Suspendre
                  </Button>
                )}
                {selected.status !== "disabled" && (
                  <Button
                    variant="alert"
                    className="min-h-[36px] px-3 text-xs"
                    disabled={isPending}
                    onClick={() => handleStatusChange(selected.id, "disabled")}
                  >
                    Désactiver
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
