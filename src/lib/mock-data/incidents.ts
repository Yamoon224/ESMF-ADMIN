import type { Incident } from "@/types/entities";

/**
 * Incidents/litiges couvrant les 5 types (ESMF_SPEC.md §3), avec des SLA
 * dans des états variés : dépassé, proche de l'échéance, confortable, clos.
 * "Aujourd'hui" mocké = 2026-07-17.
 */
export const MOCK_INCIDENTS: Incident[] = [
  {
    id: "inc-0001",
    type: "harassment",
    tripId: "trp-0014",
    status: "open",
    slaDeadline: "2026-07-17T08:00:00Z", // dépassé
    description: "Passagère signale des propos déplacés tenus par le conducteur.",
    createdAt: "2026-07-15T09:00:00Z",
    relatedUserId: "usr-007",
    relatedDriverId: "drv-006",
  },
  {
    id: "inc-0002",
    type: "accident",
    tripId: "trp-0019",
    status: "inProgress",
    slaDeadline: "2026-07-18T12:00:00Z", // proche
    description: "Léger accrochage signalé en fin de course, aucun blessé.",
    createdAt: "2026-07-16T20:30:00Z",
    relatedUserId: "usr-005",
    relatedDriverId: "drv-006",
  },
  {
    id: "inc-0003",
    type: "tariff",
    tripId: "trp-0017",
    status: "open",
    slaDeadline: "2026-07-20T00:00:00Z", // confortable
    description: "Contestation du tarif final, écart avec l'estimation initiale.",
    createdAt: "2026-07-17T07:10:00Z",
    relatedUserId: "usr-010",
    relatedDriverId: "drv-001",
  },
  {
    id: "inc-0004",
    type: "payment",
    tripId: "trp-0018",
    status: "open",
    slaDeadline: "2026-07-17T18:00:00Z", // aujourd'hui, proche
    description: "Paiement Mobile Money non confirmé après annulation de course.",
    createdAt: "2026-07-16T09:15:00Z",
    relatedUserId: "usr-003",
  },
  {
    id: "inc-0005",
    type: "complaint",
    status: "closed",
    slaDeadline: "2026-07-10T00:00:00Z",
    description: "Réclamation sur le temps d'attente excessif d'une conductrice.",
    createdAt: "2026-07-08T10:00:00Z",
    relatedUserId: "usr-002",
  },
  {
    id: "inc-0006",
    type: "harassment",
    tripId: "trp-0011",
    status: "closed",
    slaDeadline: "2026-07-11T00:00:00Z",
    description: "Signalement de comportement inapproprié, résolu après enquête.",
    createdAt: "2026-07-10T21:55:00Z",
    relatedUserId: "usr-002",
    relatedDriverId: "drv-001",
  },
  {
    id: "inc-0007",
    type: "accident",
    status: "open",
    slaDeadline: "2026-07-16T18:00:00Z", // dépassé
    description: "Chute de la conductrice moto lors d'un freinage d'urgence.",
    createdAt: "2026-07-16T08:40:00Z",
    relatedDriverId: "drv-002",
  },
];
