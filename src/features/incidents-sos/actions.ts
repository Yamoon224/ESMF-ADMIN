"use server";

import { revalidatePath } from "next/cache";
import { getSosRepository, getIncidentsRepository } from "@/lib/repositories/factory";
import type { Incident } from "@/types/entities";

export async function resolveSosAlert(
  alertId: string,
  resolution: "resolved" | "falseAlarm",
  notes: string
) {
  await getSosRepository().resolve(alertId, resolution, notes, "coord-admin");
  revalidatePath("/incidents-sos");
}

export async function setIncidentStatus(incidentId: string, status: Incident["status"]) {
  await getIncidentsRepository().setStatus(incidentId, status);
  revalidatePath("/incidents-sos");
}
