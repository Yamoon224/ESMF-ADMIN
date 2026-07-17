import type { Driver, DriverReview } from "@/types/entities";
import type { EvaluationsRepository } from "../interfaces";
import { MOCK_DRIVER_REVIEWS } from "@/lib/mock-data/reviews";
import { MOCK_DRIVERS } from "@/lib/mock-data/drivers";

/** Seuil de suspension automatique (ESMF_SPEC.md §4) : note < 3.5 sur 20 dernières courses. */
export const LOW_RATING_THRESHOLD = 3.5;

export class MockEvaluationsRepository implements EvaluationsRepository {
  private reviews: DriverReview[] = MOCK_DRIVER_REVIEWS.map((r) => ({ ...r }));
  private drivers: Driver[] = MOCK_DRIVERS.map((d) => ({ ...d }));

  async getReviews(): Promise<DriverReview[]> {
    return this.reviews;
  }

  async getReviewsByDriver(driverId: string): Promise<DriverReview[]> {
    return this.reviews.filter((r) => r.driverId === driverId);
  }

  async getFlaggedDrivers(): Promise<Driver[]> {
    return this.drivers.filter(
      (d) => d.last20RatingsAvg > 0 && d.last20RatingsAvg < LOW_RATING_THRESHOLD
    );
  }
}
