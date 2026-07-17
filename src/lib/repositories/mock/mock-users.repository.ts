import type { User } from "@/types/entities";
import type { UsersRepository } from "../interfaces";
import { MOCK_USERS } from "@/lib/mock-data/users";

/**
 * Implémentation en mémoire de UsersRepository. Les mutations modifient un
 * clone local du seed (persistant pour la session navigateur uniquement).
 */
export class MockUsersRepository implements UsersRepository {
  private users: User[] = MOCK_USERS.map((u) => ({ ...u }));

  async getAll(): Promise<User[]> {
    return this.users;
  }

  async getById(id: string): Promise<User | undefined> {
    return this.users.find((u) => u.id === id);
  }

  async setStudentVerification(
    id: string,
    status: User["studentVerificationStatus"]
  ): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === id);
    if (!user) return undefined;
    user.studentVerificationStatus = status;
    user.isStudentVerified = status === "approved";
    return user;
  }

  async setStatus(id: string, status: User["status"]): Promise<User | undefined> {
    const user = this.users.find((u) => u.id === id);
    if (!user) return undefined;
    user.status = status;
    return user;
  }
}
