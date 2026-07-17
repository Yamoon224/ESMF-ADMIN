/**
 * Modèles de données transverses ESMF.
 * Source de vérité : ESMF_SPEC.md §3.
 * Ces types sont le contrat partagé avec esmf-backend-api (§6) : une fois le
 * backend réel disponible, seules les implémentations de repository changent,
 * pas ces types ni les composants qui les consomment.
 */

export type UserStatus = "active" | "suspended" | "disabled";

export interface EmergencyContact {
  name: string;
  phone: string;
}

export interface ChildAccount {
  id: string;
  parentId: string;
  firstName: string;
  lastName: string;
  age: number;
  school: string;
}

export type AccountType = "standard" | "student" | "withChildren";

export interface User {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  cinDocUrl?: string;
  isStudentVerified: boolean;
  studentCardUrl?: string;
  studentVerificationStatus: "none" | "pending" | "approved" | "rejected";
  emergencyContacts: EmergencyContact[];
  loyaltyPoints: number;
  status: UserStatus;
  zone: string;
  accountType: AccountType;
  createdAt: string;
  childAccounts: ChildAccount[];
}

export type LicenseCategory = "A" | "A3" | "B";
export type VehicleType = "tricycle" | "moto" | "voiture";
export type DriverStatus = "pending" | "active" | "suspended";

export interface DocumentsExpiry {
  permit: string;
  insurance: string;
  criminalRecord: string;
}

export interface RegistrationStep {
  label: string;
  completed: boolean;
}

export interface Driver {
  id: string;
  phone: string;
  firstName: string;
  lastName: string;
  photoUrl?: string;
  cin: string;
  licenseCategory: LicenseCategory;
  criminalRecordDate: string;
  vehicleType: VehicleType;
  plate: string;
  rating: number;
  status: DriverStatus;
  documentsExpiry: DocumentsExpiry;
  monthlyEarnings: number;
  isOnline: boolean;
  isEsmfStar: boolean;
  zone: string;
  registrationSteps: RegistrationStep[];
  trainingCompleted: string[];
  contractSignedAt?: string;
  createdAt: string;
  last20RatingsAvg: number;
}

export type TripStatus =
  | "requesting"
  | "assigned"
  | "arrived"
  | "inProgress"
  | "completed"
  | "cancelled";

export interface GeoPoint {
  label: string;
  lat: number;
  lng: number;
}

export interface Trip {
  id: string;
  passengerId: string;
  driverId?: string;
  pickup: GeoPoint;
  destination: GeoPoint;
  vehicleType: VehicleType;
  status: TripStatus;
  fareEstimate: number;
  fareFinal?: number;
  isCarpooling: boolean;
  isStudentDiscount: boolean;
  isFemaleDriverOnly: boolean;
  createdAt: string;
  startedAt?: string;
  endedAt?: string;
  rating?: number;
}

export type PaymentMethod = "mtn" | "moov" | "celtis" | "orange" | "cash";
export type PaymentStatus = "pending" | "confirmed" | "failed";

export interface Payment {
  id: string;
  tripId: string;
  amount: number;
  method: PaymentMethod;
  status: PaymentStatus;
  driverShare: number;
  esmfOperationsShare: number;
  esmfSocialShare: number;
  createdAt: string;
}

export type SosStatus = "active" | "falseAlarm" | "resolved";

export interface SosAlert {
  id: string;
  tripId: string;
  passengerId: string;
  triggeredAt: string;
  status: SosStatus;
  position: { lat: number; lng: number };
  coordinatorId?: string;
  resolvedAt?: string;
  notes?: string;
}

export type IncidentType =
  | "harassment"
  | "tariff"
  | "payment"
  | "accident"
  | "complaint";
export type IncidentStatus = "open" | "inProgress" | "closed";

export interface Incident {
  id: string;
  type: IncidentType;
  tripId?: string;
  status: IncidentStatus;
  slaDeadline: string;
  description: string;
  createdAt: string;
  relatedUserId?: string;
  relatedDriverId?: string;
}

export interface LoyaltyTransaction {
  id: string;
  userId: string;
  points: number;
  reason: string;
  createdAt: string;
}

export interface LoyaltyTier {
  threshold: number;
  reward: string;
}

export type EducationCategory = "financeEducation" | "health" | "antiVbg";

export interface EducationModule {
  id: string;
  code: string;
  title: string;
  category: EducationCategory;
  format: string;
  durationMin: number;
  pointsRequired: number;
  status: "published" | "draft";
}

export interface DriverReview {
  id: string;
  driverId: string;
  tripId: string;
  rating: number;
  comment?: string;
  createdAt: string;
}

export interface PlatformSettings {
  baseFareTricycle: number;
  baseFareMoto: number;
  baseFareVoiture: number;
  nightSurchargeStart: string;
  nightSurchargeEnd: string;
  nightSurchargeMinPct: number;
  nightSurchargeMaxPct: number;
  studentDiscountPct: number;
  carpoolingDiscountPct: number;
  driverSearchRadiusKm: number;
  maxCarpoolMotoTricycle: number;
  maxCarpoolVoiture: number;
  lowRatingThreshold: number;
  lowRatingSampleSize: number;
}

export type AdminRoleId =
  | "super_admin"
  | "regional_admin"
  | "supervisor"
  | "field_coordinator"
  | "data_analyst"
  | "customer_support";

export interface AdminRoleDefinition {
  id: AdminRoleId;
  label: string;
  description: string;
}
