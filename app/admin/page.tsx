import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/admin-auth"
import { DashboardOverview } from "@/components/admin/DashboardOverview"
import { RecentActivity } from "@/components/admin/RecentActivity"

export default async function AdminDashboard() {
  try {
    await requireAdmin()
  } catch (error) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>
      <DashboardOverview />
      <RecentActivity />
    </div>
  )
}

