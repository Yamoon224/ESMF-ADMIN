import type { Payment, PaymentMethod } from "@/types/entities";
import { MOCK_TRIPS } from "./trips";

const METHOD_CYCLE: PaymentMethod[] = ["mtn", "moov", "celtis", "orange", "cash"];

/**
 * Paiements dérivés des trajets complétés, avec répartition
 * 80% conductrice / 15% exploitation ESMF / 5% programme social (ESMF_SPEC.md §4).
 */
export const MOCK_PAYMENTS: Payment[] = MOCK_TRIPS.filter(
  (trip) => trip.status === "completed" && trip.fareFinal
).map((trip, index) => {
  const amount = trip.fareFinal as number;
  const method = METHOD_CYCLE[index % METHOD_CYCLE.length];
  const status: Payment["status"] =
    index === 2 ? "pending" : index === 5 ? "failed" : "confirmed";

  return {
    id: `pay-${String(index + 1).padStart(4, "0")}`,
    tripId: trip.id,
    amount,
    method,
    status,
    driverShare: Math.round(amount * 0.8),
    esmfOperationsShare: Math.round(amount * 0.15),
    esmfSocialShare: Math.round(amount * 0.05),
    createdAt: trip.endedAt ?? trip.createdAt,
  } satisfies Payment;
});
