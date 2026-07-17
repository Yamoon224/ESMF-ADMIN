import { MockUsersRepository } from "./mock/mock-users.repository";
import { MockDriversRepository } from "./mock/mock-drivers.repository";
import { MockTripsRepository } from "./mock/mock-trips.repository";
import { MockPaymentsRepository } from "./mock/mock-payments.repository";
import { MockSosRepository } from "./mock/mock-sos.repository";
import { MockIncidentsRepository } from "./mock/mock-incidents.repository";
import { MockEvaluationsRepository } from "./mock/mock-evaluations.repository";
import { MockEducationRepository } from "./mock/mock-education.repository";
import { MockLoyaltyRepository } from "./mock/mock-loyalty.repository";
import { MockReportsRepository } from "./mock/mock-reports.repository";
import { MockSettingsRepository } from "./mock/mock-settings.repository";
import type {
  DriversRepository,
  EducationRepository,
  EvaluationsRepository,
  IncidentsRepository,
  LoyaltyRepository,
  PaymentsRepository,
  ReportsRepository,
  SettingsRepository,
  SosRepository,
  TripsRepository,
  UsersRepository,
} from "./interfaces";

/**
 * Point d'accès unique aux repositories (factory + singletons en mémoire).
 *
 * Toutes les pages/features doivent obtenir leurs données via ces fonctions,
 * jamais en important les modules `mock-data/*` ou `Mock*Repository`
 * directement. C'est le seul fichier à modifier pour brancher le dashboard
 * sur l'API réelle `esmf-backend-api` (§6 du spec partagé) : remplacer
 * chaque `new Mock*Repository()` par un `new Http*Repository(baseUrl)` qui
 * implémente la même interface — aucune page n'a besoin de changer.
 */

let usersRepository: UsersRepository | undefined;
let driversRepository: DriversRepository | undefined;
let tripsRepository: TripsRepository | undefined;
let paymentsRepository: PaymentsRepository | undefined;
let sosRepository: SosRepository | undefined;
let incidentsRepository: IncidentsRepository | undefined;
let evaluationsRepository: EvaluationsRepository | undefined;
let educationRepository: EducationRepository | undefined;
let loyaltyRepository: LoyaltyRepository | undefined;
let reportsRepository: ReportsRepository | undefined;
let settingsRepository: SettingsRepository | undefined;

export function getUsersRepository(): UsersRepository {
  if (!usersRepository) usersRepository = new MockUsersRepository();
  return usersRepository;
}

export function getDriversRepository(): DriversRepository {
  if (!driversRepository) driversRepository = new MockDriversRepository();
  return driversRepository;
}

export function getTripsRepository(): TripsRepository {
  if (!tripsRepository) tripsRepository = new MockTripsRepository();
  return tripsRepository;
}

export function getPaymentsRepository(): PaymentsRepository {
  if (!paymentsRepository) paymentsRepository = new MockPaymentsRepository();
  return paymentsRepository;
}

export function getSosRepository(): SosRepository {
  if (!sosRepository) sosRepository = new MockSosRepository();
  return sosRepository;
}

export function getIncidentsRepository(): IncidentsRepository {
  if (!incidentsRepository) incidentsRepository = new MockIncidentsRepository();
  return incidentsRepository;
}

export function getEvaluationsRepository(): EvaluationsRepository {
  if (!evaluationsRepository) evaluationsRepository = new MockEvaluationsRepository();
  return evaluationsRepository;
}

export function getEducationRepository(): EducationRepository {
  if (!educationRepository) educationRepository = new MockEducationRepository();
  return educationRepository;
}

export function getLoyaltyRepository(): LoyaltyRepository {
  if (!loyaltyRepository) loyaltyRepository = new MockLoyaltyRepository();
  return loyaltyRepository;
}

export function getReportsRepository(): ReportsRepository {
  if (!reportsRepository) reportsRepository = new MockReportsRepository();
  return reportsRepository;
}

export function getSettingsRepository(): SettingsRepository {
  if (!settingsRepository) settingsRepository = new MockSettingsRepository();
  return settingsRepository;
}
