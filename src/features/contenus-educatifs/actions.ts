"use server";

import { revalidatePath } from "next/cache";
import { getEducationRepository } from "@/lib/repositories/factory";
import type { EducationModule } from "@/types/entities";

export async function setModuleStatus(moduleId: string, status: EducationModule["status"]) {
  await getEducationRepository().setStatus(moduleId, status);
  revalidatePath("/contenus-educatifs");
}
