"use server";

import { revalidatePath } from "next/cache";
import { getUsersRepository } from "@/lib/repositories/factory";
import type { User } from "@/types/entities";

/**
 * Server Actions : point d'entrée unique pour les mutations sur les
 * utilisatrices. La logique métier reste ici, jamais dans les composants UI
 * (ESMF_SPEC.md §8).
 */

export async function approveStudentMode(userId: string) {
  await getUsersRepository().setStudentVerification(userId, "approved");
  revalidatePath("/utilisatrices");
}

export async function rejectStudentMode(userId: string) {
  await getUsersRepository().setStudentVerification(userId, "rejected");
  revalidatePath("/utilisatrices");
}

export async function setUserStatus(userId: string, status: User["status"]) {
  await getUsersRepository().setStatus(userId, status);
  revalidatePath("/utilisatrices");
}
