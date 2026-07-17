import type { LoyaltyTier, LoyaltyTransaction } from "@/types/entities";

/**
 * Paliers de fidélité (ESMF_SPEC.md §4) : modules éducatifs successifs,
 * puis capsule partenaire, puis module Anti-VBG.
 */
export const LOYALTY_TIERS: LoyaltyTier[] = [
  { threshold: 10, reward: "Module éducatif financier EF-01" },
  { threshold: 20, reward: "Module éducatif financier EF-02" },
  { threshold: 30, reward: "Module santé SA-01" },
  { threshold: 40, reward: "Module santé SA-02" },
  { threshold: 50, reward: "Module financier EF-03" },
  { threshold: 75, reward: "Capsule partenaire (offre exclusive)" },
  { threshold: 100, reward: "Module Anti-VBG VBG-01" },
];

export const LOYALTY_POINT_REASONS: { reason: string; points: number }[] = [
  { reason: "Trajet complété", points: 1 },
  { reason: "Premier trajet du mois", points: 5 },
  { reason: "Covoiturage", points: 2 },
  { reason: "Notation laissée", points: 1 },
  { reason: "Parrainage", points: 10 },
  { reason: "Bienvenue", points: 5 },
  { reason: "Accès module éducatif", points: 2 },
  { reason: "Anniversaire", points: 20 },
];

export const MOCK_LOYALTY_TRANSACTIONS: LoyaltyTransaction[] = [
  { id: "lty-0001", userId: "usr-001", points: 5, reason: "Bienvenue", createdAt: "2025-11-02T08:12:00Z" },
  { id: "lty-0002", userId: "usr-001", points: 1, reason: "Trajet complété", createdAt: "2026-07-16T08:34:00Z" },
  { id: "lty-0003", userId: "usr-002", points: 5, reason: "Premier trajet du mois", createdAt: "2026-07-01T17:40:00Z" },
  { id: "lty-0004", userId: "usr-002", points: 2, reason: "Covoiturage", createdAt: "2026-07-01T17:40:00Z" },
  { id: "lty-0005", userId: "usr-004", points: 20, reason: "Anniversaire", createdAt: "2026-05-18T00:00:00Z" },
  { id: "lty-0006", userId: "usr-007", points: 10, reason: "Parrainage", createdAt: "2026-06-01T00:00:00Z" },
  { id: "lty-0007", userId: "usr-006", points: 2, reason: "Accès module éducatif", createdAt: "2026-06-15T00:00:00Z" },
];
