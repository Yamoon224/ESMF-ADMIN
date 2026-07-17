import type { Incident } from "@/types/entities";
import type { IncidentsRepository } from "../interfaces";
import { MOCK_INCIDENTS } from "@/lib/mock-data/incidents";

export class MockIncidentsRepository implements IncidentsRepository {
  private incidents: Incident[] = MOCK_INCIDENTS.map((i) => ({ ...i }));

  async getAll(): Promise<Incident[]> {
    return this.incidents;
  }

  async getById(id: string): Promise<Incident | undefined> {
    return this.incidents.find((i) => i.id === id);
  }

  async setStatus(id: string, status: Incident["status"]): Promise<Incident | undefined> {
    const incident = this.incidents.find((i) => i.id === id);
    if (!incident) return undefined;
    incident.status = status;
    return incident;
  }
}
