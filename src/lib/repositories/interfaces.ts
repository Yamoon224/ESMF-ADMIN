import type {
  Driver,
  DriverReview,
  EducationModule,
  Incident,
  LoyaltyTier,
  LoyaltyTransaction,
  Payment,
  PlatformSettings,
  SosAlert,
  Trip,
  User,
} from "@/types/entities";

/**
 * Interfaces de repository (DIP) : les pages/composants dépendent de ces
 * abstractions, jamais des données mockées directement. Une future
 * implémentation `Http*Repository` pointant vers esmf-backend-api (§6 du
 * spec partagé) pourra remplacer chaque `Mock*Repository` sans toucher à
 * l'UI — voir src/lib/repositories/factory.ts.
 */

export interface UsersRepository {
  getAll(): Promise<User[]>;
  getById(id: string): Promise<User | undefined>;
  setStudentVerification(
    id: string,
    status: User["studentVerificationStatus"]
  ): Promise<User | undefined>;
  setStatus(id: string, status: User["status"]): Promise<User | undefined>;
}

export interface DriversRepository {
  getAll(): Promise<Driver[]>;
  getById(id: string): Promise<Driver | undefined>;
  getPendingRegistrations(): Promise<Driver[]>;
  getExpiringDocuments(withinDays: number): Promise<
    { driver: Driver; document: "permit" | "insurance" | "criminalRecord"; expiresAt: string }[]
  >;
  setStatus(id: string, status: Driver["status"]): Promise<Driver | undefined>;
}

export interface TripsRepository {
  getAll(): Promise<Trip[]>;
  getById(id: string): Promise<Trip | undefined>;
  getActive(): Promise<Trip[]>;
}

export interface PaymentsRepository {
  getAll(): Promise<Payment[]>;
  getRevenueTrend(): Promise<{ date: string; revenue: number }[]>;
  getBreakdownByMethod(): Promise<{ method: string; amount: number }[]>;
}

export interface SosRepository {
  getAll(): Promise<SosAlert[]>;
  getActive(): Promise<SosAlert[]>;
  resolve(
    id: string,
    resolution: "resolved" | "falseAlarm",
    notes: string,
    coordinatorId: string
  ): Promise<SosAlert | undefined>;
}

export interface IncidentsRepository {
  getAll(): Promise<Incident[]>;
  getById(id: string): Promise<Incident | undefined>;
  setStatus(id: string, status: Incident["status"]): Promise<Incident | undefined>;
}

export interface EvaluationsRepository {
  getReviews(): Promise<DriverReview[]>;
  getReviewsByDriver(driverId: string): Promise<DriverReview[]>;
  getFlaggedDrivers(): Promise<Driver[]>;
}

export interface EducationRepository {
  getModules(): Promise<EducationModule[]>;
  setStatus(id: string, status: EducationModule["status"]): Promise<EducationModule | undefined>;
}

export interface LoyaltyRepository {
  getTiers(): Promise<LoyaltyTier[]>;
  getTransactions(userId: string): Promise<LoyaltyTransaction[]>;
}

export interface ReportsRepository {
  getMobilityKpis(): Promise<{ label: string; value: string | number }[]>;
  getSecurityKpis(): Promise<{ label: string; value: string | number }[]>;
  getFinancialKpis(): Promise<{ label: string; value: string | number }[]>;
  getSocialImpactKpis(): Promise<{ label: string; value: string | number }[]>;
}

export interface SettingsRepository {
  get(): Promise<PlatformSettings>;
  update(patch: Partial<PlatformSettings>): Promise<PlatformSettings>;
}
