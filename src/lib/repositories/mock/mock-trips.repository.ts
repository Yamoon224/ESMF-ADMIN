import type { Trip } from "@/types/entities";
import type { TripsRepository } from "../interfaces";
import { MOCK_TRIPS } from "@/lib/mock-data/trips";

const ACTIVE_STATUSES: Trip["status"][] = [
  "requesting",
  "assigned",
  "arrived",
  "inProgress",
];

export class MockTripsRepository implements TripsRepository {
  private trips: Trip[] = MOCK_TRIPS.map((t) => ({ ...t }));

  async getAll(): Promise<Trip[]> {
    return this.trips;
  }

  async getById(id: string): Promise<Trip | undefined> {
    return this.trips.find((t) => t.id === id);
  }

  async getActive(): Promise<Trip[]> {
    return this.trips.filter((t) => ACTIVE_STATUSES.includes(t.status));
  }
}
