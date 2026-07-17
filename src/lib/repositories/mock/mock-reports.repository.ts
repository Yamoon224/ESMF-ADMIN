import type { ReportsRepository } from "../interfaces";
import { MOCK_TRIPS } from "@/lib/mock-data/trips";
import { MOCK_PAYMENTS } from "@/lib/mock-data/payments";
import { MOCK_USERS } from "@/lib/mock-data/users";
import { MOCK_DRIVERS } from "@/lib/mock-data/drivers";
import { MOCK_SOS_ALERTS } from "@/lib/mock-data/sos-alerts";
import { MOCK_INCIDENTS } from "@/lib/mock-data/incidents";

function formatFcfa(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export class MockReportsRepository implements ReportsRepository {
  async getMobilityKpis() {
    const completed = MOCK_TRIPS.filter((t) => t.status === "completed");
    const cancelled = MOCK_TRIPS.filter((t) => t.status === "cancelled");
    const carpooling = MOCK_TRIPS.filter((t) => t.isCarpooling);
    return [
      { label: "Trajets complétés", value: completed.length },
      { label: "Trajets annulés", value: cancelled.length },
      { label: "Taux de covoiturage", value: `${Math.round((carpooling.length / MOCK_TRIPS.length) * 100)}%` },
      {
        label: "Distance moyenne estimée",
        value: "4,2 km",
      },
    ];
  }

  async getSecurityKpis() {
    const activeSos = MOCK_SOS_ALERTS.filter((s) => s.status === "active");
    const resolvedSos = MOCK_SOS_ALERTS.filter((s) => s.status === "resolved");
    const openIncidents = MOCK_INCIDENTS.filter((i) => i.status !== "closed");
    const femaleOnlyTrips = MOCK_TRIPS.filter((t) => t.isFemaleDriverOnly);
    return [
      { label: "Alertes SOS actives", value: activeSos.length },
      { label: "Alertes SOS résolues (total)", value: resolvedSos.length },
      { label: "Incidents ouverts", value: openIncidents.length },
      {
        label: "Trajets « conductrice uniquement »",
        value: `${Math.round((femaleOnlyTrips.length / MOCK_TRIPS.length) * 100)}%`,
      },
    ];
  }

  async getFinancialKpis() {
    const confirmed = MOCK_PAYMENTS.filter((p) => p.status === "confirmed");
    const totalRevenue = confirmed.reduce((sum, p) => sum + p.amount, 0);
    const driverShare = confirmed.reduce((sum, p) => sum + p.driverShare, 0);
    const socialShare = confirmed.reduce((sum, p) => sum + p.esmfSocialShare, 0);
    return [
      { label: "Revenu total confirmé", value: formatFcfa(totalRevenue) },
      { label: "Reversé aux conductrices (80%)", value: formatFcfa(driverShare) },
      { label: "Programme social (5%)", value: formatFcfa(socialShare) },
      { label: "Transactions en attente", value: MOCK_PAYMENTS.filter((p) => p.status === "pending").length },
    ];
  }

  async getSocialImpactKpis() {
    const studentUsers = MOCK_USERS.filter((u) => u.isStudentVerified);
    const starDrivers = MOCK_DRIVERS.filter((d) => d.isEsmfStar);
    const totalLoyaltyPoints = MOCK_USERS.reduce((sum, u) => sum + u.loyaltyPoints, 0);
    return [
      { label: "Étudiantes vérifiées", value: studentUsers.length },
      { label: "Conductrices ESMF Star", value: starDrivers.length },
      { label: "Points de fidélité cumulés", value: totalLoyaltyPoints },
      {
        label: "Conductrices actives ce mois",
        value: MOCK_DRIVERS.filter((d) => d.status === "active").length,
      },
    ];
  }
}
