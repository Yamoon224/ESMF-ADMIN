import type { DriverReview } from "@/types/entities";
import { MOCK_TRIPS } from "./trips";

const COMMENTS = [
  "Conduite très prudente, je me suis sentie en sécurité.",
  "Ponctuelle et courtoise.",
  "Trajet correct, rien à signaler.",
  "Un peu d'attente au départ mais trajet agréable.",
  "Excellent accueil, recommandé.",
  "Conduite trop rapide à mon goût.",
  "Très professionnelle, merci !",
];

/**
 * Historique d'avis dérivé des trajets notés.
 */
export const MOCK_DRIVER_REVIEWS: DriverReview[] = MOCK_TRIPS.filter(
  (trip) => trip.driverId && trip.rating !== undefined
).map((trip, index) => ({
  id: `rev-${String(index + 1).padStart(4, "0")}`,
  driverId: trip.driverId as string,
  tripId: trip.id,
  rating: trip.rating as number,
  comment: COMMENTS[index % COMMENTS.length],
  createdAt: trip.endedAt ?? trip.createdAt,
}));
