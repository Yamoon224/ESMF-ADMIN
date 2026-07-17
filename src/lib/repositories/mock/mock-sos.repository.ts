import type { SosAlert } from "@/types/entities";
import type { SosRepository } from "../interfaces";
import { MOCK_SOS_ALERTS } from "@/lib/mock-data/sos-alerts";

export class MockSosRepository implements SosRepository {
  private alerts: SosAlert[] = MOCK_SOS_ALERTS.map((a) => ({ ...a }));

  async getAll(): Promise<SosAlert[]> {
    return this.alerts;
  }

  async getActive(): Promise<SosAlert[]> {
    return this.alerts.filter((a) => a.status === "active");
  }

  async resolve(
    id: string,
    resolution: "resolved" | "falseAlarm",
    notes: string,
    coordinatorId: string
  ): Promise<SosAlert | undefined> {
    const alert = this.alerts.find((a) => a.id === id);
    if (!alert) return undefined;
    alert.status = resolution;
    alert.notes = notes;
    alert.coordinatorId = coordinatorId;
    alert.resolvedAt = new Date().toISOString();
    return alert;
  }
}
