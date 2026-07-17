import type { SosAlert } from "@/types/entities";

/**
 * Alertes SOS mockées : 2 actives (le cas le plus critique du produit,
 * cf. CDCF §5.2/§8) + quelques résolues/fausses alertes pour l'historique.
 */
export const MOCK_SOS_ALERTS: SosAlert[] = [
  {
    id: "sos-0001",
    tripId: "trp-0005",
    passengerId: "usr-006",
    triggeredAt: "2026-07-17T10:58:00Z",
    status: "active",
    position: { lat: 6.3625, lng: 2.4275 },
  },
  {
    id: "sos-0002",
    tripId: "trp-0006",
    passengerId: "usr-007",
    triggeredAt: "2026-07-17T11:04:00Z",
    status: "active",
    position: { lat: 6.3833, lng: 2.3333 },
  },
  {
    id: "sos-0003",
    tripId: "trp-0014",
    passengerId: "usr-007",
    triggeredAt: "2026-07-07T22:48:00Z",
    status: "resolved",
    position: { lat: 6.3717, lng: 2.4014 },
    coordinatorId: "coord-01",
    resolvedAt: "2026-07-07T22:56:00Z",
    notes: "Fausse manipulation confirmée avec la passagère par appel. RAS.",
  },
  {
    id: "sos-0004",
    tripId: "trp-0019",
    passengerId: "usr-005",
    triggeredAt: "2026-07-02T20:05:00Z",
    status: "resolved",
    position: { lat: 6.365, lng: 2.4501 },
    coordinatorId: "coord-02",
    resolvedAt: "2026-07-02T20:18:00Z",
    notes: "Conducteur en excès de vitesse signalé. Avertissement envoyé.",
  },
  {
    id: "sos-0005",
    tripId: "trp-0010",
    passengerId: "usr-005",
    triggeredAt: "2026-07-13T14:22:00Z",
    status: "falseAlarm",
    position: { lat: 6.3906, lng: 2.335 },
    coordinatorId: "coord-01",
    resolvedAt: "2026-07-13T14:26:00Z",
    notes: "Appui accidentel dans la poche. Confirmé sans risque.",
  },
];
