import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/admin-auth"
import { UserManagement } from "@/components/admin/UserManagement"

export default async function AdminUsersPage() {
  try {
    await requireAdmin()
  } catch (error) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">User Management</h1>
      <UserManagement />
    </div>
  )
}

