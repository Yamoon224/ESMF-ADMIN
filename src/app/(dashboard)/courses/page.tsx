import { PageHeader } from "@/components/ui/page-header";
import { CoursesView } from "@/features/courses/ui/courses-view";
import {
  getTripsRepository,
  getDriversRepository,
  getUsersRepository,
} from "@/lib/repositories/factory";

export default async function CoursesPage() {
  const [activeTrips, drivers, users] = await Promise.all([
    getTripsRepository().getActive(),
    getDriversRepository().getAll(),
    getUsersRepository().getAll(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Courses en temps réel"
        description="Suivi cartographique des conductrices et des courses actives."
      />
      <CoursesView activeTrips={activeTrips} drivers={drivers} users={users} />
    </div>
  );
}
