import type { LoyaltyTier, LoyaltyTransaction } from "@/types/entities";
import type { LoyaltyRepository } from "../interfaces";
import { LOYALTY_TIERS, MOCK_LOYALTY_TRANSACTIONS } from "@/lib/mock-data/loyalty";

export class MockLoyaltyRepository implements LoyaltyRepository {
  private tiers: LoyaltyTier[] = LOYALTY_TIERS;
  private transactions: LoyaltyTransaction[] = MOCK_LOYALTY_TRANSACTIONS;

  async getTiers(): Promise<LoyaltyTier[]> {
    return this.tiers;
  }

  async getTransactions(userId: string): Promise<LoyaltyTransaction[]> {
    return this.transactions.filter((t) => t.userId === userId);
  }
}
