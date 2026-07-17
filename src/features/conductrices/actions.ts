"use server";

import { revalidatePath } from "next/cache";
import { getDriversRepository } from "@/lib/repositories/factory";
import type { Driver } from "@/types/entities";

export async function setDriverStatus(driverId: string, status: Driver["status"]) {
  await getDriversRepository().setStatus(driverId, status);
  revalidatePath("/conductrices");
}
