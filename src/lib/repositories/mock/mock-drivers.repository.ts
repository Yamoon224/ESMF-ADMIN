import type { Driver } from "@/types/entities";
import type { DriversRepository } from "../interfaces";
import { MOCK_DRIVERS } from "@/lib/mock-data/drivers";

const MS_IN_DAY = 24 * 60 * 60 * 1000;

/** "Aujourd'hui" mocké pour les calculs d'expiration de documents. */
const MOCKED_NOW = new Date("2026-07-17T09:00:00Z");

export class MockDriversRepository implements DriversRepository {
  private drivers: Driver[] = MOCK_DRIVERS.map((d) => ({ ...d }));

  async getAll(): Promise<Driver[]> {
    return this.drivers;
  }

  async getById(id: string): Promise<Driver | undefined> {
    return this.drivers.find((d) => d.id === id);
  }

  async getPendingRegistrations(): Promise<Driver[]> {
    return this.drivers.filter((d) => d.status === "pending");
  }

  async getExpiringDocuments(withinDays: number) {
    const results: {
      driver: Driver;
      document: "permit" | "insurance" | "criminalRecord";
      expiresAt: string;
    }[] = [];

    for (const driver of this.drivers) {
      (["permit", "insurance", "criminalRecord"] as const).forEach((doc) => {
        const expiry = new Date(driver.documentsExpiry[doc]);
        const daysLeft = (expiry.getTime() - MOCKED_NOW.getTime()) / MS_IN_DAY;
        if (daysLeft <= withinDays) {
          results.push({ driver, document: doc, expiresAt: driver.documentsExpiry[doc] });
        }
      });
    }

    return results;
  }

  async setStatus(id: string, status: Driver["status"]): Promise<Driver | undefined> {
    const driver = this.drivers.find((d) => d.id === id);
    if (!driver) return undefined;
    driver.status = status;
    return driver;
  }
}
