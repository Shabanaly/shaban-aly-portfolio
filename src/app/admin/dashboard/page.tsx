import { getAllProjectsAdmin, getProfile } from "@/lib/data";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { DashboardClient } from "@/components/admin/DashboardClient";

export default async function AdminDashboardPage() {
  const [projects, profile] = await Promise.all([
    getAllProjectsAdmin(),
    getProfile(),
  ]);

  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-primary)">
      <AdminHeader />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <DashboardClient initialProjects={projects} initialProfile={profile} />
      </main>
    </div>
  );
}

