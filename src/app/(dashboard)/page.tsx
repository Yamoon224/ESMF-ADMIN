import { Users, Car, Route, Wallet, ShieldAlert } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Panel } from "@/components/ui/panel";
import { PageHeader } from "@/components/ui/page-header";
import { ActivityFeed, type ActivityItem } from "@/features/dashboard/ui/activity-feed";
import { AlertsPanel } from "@/features/dashboard/ui/alerts-panel";
import { LiveTripsMap } from "@/features/dashboard/ui/live-trips-map";
import {
  getUsersRepository,
  getDriversRepository,
  getTripsRepository,
  getPaymentsRepository,
  getSosRepository,
  getIncidentsRepository,
} from "@/lib/repositories/factory";

function formatFcfa(value: number): string {
  return `${value.toLocaleString("fr-FR")} FCFA`;
}

export default async function DashboardPage() {
  const [users, drivers, trips, payments, sosAlerts, incidents] = await Promise.all([
    getUsersRepository().getAll(),
    getDriversRepository().getAll(),
    getTripsRepository().getAll(),
    getPaymentsRepository().getAll(),
    getSosRepository().getActive(),
    getIncidentsRepository().getAll(),
  ]);

  const activeUsers = users.filter((u) => u.status === "active").length;
  const activeDrivers = drivers.filter((d) => d.isOnline).length;
  const totalRevenue = payments
    .filter((p) => p.status === "confirmed")
    .reduce((sum, p) => sum + p.amount, 0);
  const openIncidents = incidents.filter((i) => i.status !== "closed");

  const recentTrips = [...trips]
    .sort((a, b) => (a.createdAt < b.createdAt ? 1 : -1))
    .slice(0, 6);

  const activityItems: ActivityItem[] = recentTrips.map((trip) => ({
    id: trip.id,
    label: `Trajet ${trip.id} — ${trip.pickup.label} → ${trip.destination.label}`,
    time: new Date(trip.createdAt).toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    }),
    tone: trip.status === "cancelled" ? "alert" : trip.status === "completed" ? "success" : "default",
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tableau de bord"
        description="Vue d'ensemble en temps réel de l'activité ESMF."
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KpiCard label="Utilisatrices actives" value={activeUsers} icon={<Users size={18} />} />
        <KpiCard label="Conductrices actives" value={activeDrivers} icon={<Car size={18} />} />
        <KpiCard label="Courses au total" value={trips.length} icon={<Route size={18} />} />
        <KpiCard label="Revenu total" value={formatFcfa(totalRevenue)} icon={<Wallet size={18} />} />
        <KpiCard
          label="Incidents SOS actifs"
          value={sosAlerts.length}
          icon={<ShieldAlert size={18} />}
          variant={sosAlerts.length > 0 ? "alert" : "success"}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-2">
          <Panel title="Courses en temps réel" description="Aperçu géographique (données mockées)">
            <LiveTripsMap trips={trips} />
          </Panel>
          <Panel title="Activité récente" description="Derniers trajets enregistrés sur la plateforme">
            <ActivityFeed items={activityItems} />
          </Panel>
        </div>
        <Panel title="Alertes" description="SOS actives et incidents non résolus">
          <AlertsPanel sosAlerts={sosAlerts} incidents={openIncidents} />
        </Panel>
      </div>
    </div>
  );
}
