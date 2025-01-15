import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/admin-auth"
import { ProjectManagement } from "@/components/admin/ProjectManagement"

export default async function AdminProjectsPage() {
  try {
    await requireAdmin()
  } catch (error) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Project Management</h1>
      <ProjectManagement />
    </div>
  )
}

