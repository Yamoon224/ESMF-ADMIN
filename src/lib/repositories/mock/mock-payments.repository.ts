import type { Payment } from "@/types/entities";
import type { PaymentsRepository } from "../interfaces";
import { MOCK_PAYMENTS } from "@/lib/mock-data/payments";

const METHOD_LABELS: Record<Payment["method"], string> = {
  mtn: "MTN Mobile Money",
  moov: "Moov Money",
  celtis: "Celtis Cash",
  orange: "Orange Money",
  cash: "Espèces",
};

export class MockPaymentsRepository implements PaymentsRepository {
  private payments: Payment[] = MOCK_PAYMENTS.map((p) => ({ ...p }));

  async getAll(): Promise<Payment[]> {
    return this.payments;
  }

  async getRevenueTrend(): Promise<{ date: string; revenue: number }[]> {
    const byDate = new Map<string, number>();
    for (const payment of this.payments) {
      if (payment.status !== "confirmed") continue;
      const date = payment.createdAt.slice(0, 10);
      byDate.set(date, (byDate.get(date) ?? 0) + payment.amount);
    }
    return Array.from(byDate.entries())
      .sort(([a], [b]) => (a < b ? -1 : 1))
      .map(([date, revenue]) => ({ date, revenue }));
  }

  async getBreakdownByMethod(): Promise<{ method: string; amount: number }[]> {
    const byMethod = new Map<Payment["method"], number>();
    for (const payment of this.payments) {
      if (payment.status !== "confirmed") continue;
      byMethod.set(payment.method, (byMethod.get(payment.method) ?? 0) + payment.amount);
    }
    return Array.from(byMethod.entries()).map(([method, amount]) => ({
      method: METHOD_LABELS[method],
      amount,
    }));
  }
}
