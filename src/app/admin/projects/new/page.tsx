import { AdminHeader } from "@/components/admin/AdminHeader";
import { ProjectForm } from "@/components/admin/ProjectForm";

export default function NewProjectPage() {
  return (
    <div className="min-h-screen bg-(--bg-page) text-(--text-primary)">
      <AdminHeader />
      <ProjectForm />
    </div>
  );
}

