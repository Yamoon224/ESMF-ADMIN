import type { PlatformSettings } from "@/types/entities";

/**
 * Paramétrage global mocké (ESMF_SPEC.md §4) : tarifs de base, majoration
 * nocturne, réductions, rayon de recherche conducteur, seuil de suspension.
 */
export const MOCK_PLATFORM_SETTINGS: PlatformSettings = {
  baseFareTricycle: 400,
  baseFareMoto: 300,
  baseFareVoiture: 700,
  nightSurchargeStart: "21:00",
  nightSurchargeEnd: "05:00",
  nightSurchargeMinPct: 15,
  nightSurchargeMaxPct: 30,
  studentDiscountPct: 20,
  carpoolingDiscountPct: 30,
  driverSearchRadiusKm: 3,
  maxCarpoolMotoTricycle: 2,
  maxCarpoolVoiture: 3,
  lowRatingThreshold: 3.5,
  lowRatingSampleSize: 20,
};
