import { notFound } from "next/navigation";
import { getAllProjectsAdmin } from "@/lib/data";
import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export const dynamic = "force-dynamic";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditProjectPage({ params }: Props) {
  const { id } = await params;
  const allProjects = await getAllProjectsAdmin();
  const project = allProjects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-primary)">
      <AdminHeader />
      <ProjectForm project={project} />
    </div>
  );
}

