"use server";

import { revalidatePath } from "next/cache";
import { getSettingsRepository } from "@/lib/repositories/factory";
import type { PlatformSettings } from "@/types/entities";

export async function updateSettings(patch: Partial<PlatformSettings>) {
  const updated = await getSettingsRepository().update(patch);
  revalidatePath("/parametres");
  return updated;
}
