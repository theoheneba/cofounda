import { redirect } from "next/navigation"
import { requireAdmin } from "@/lib/admin-auth"
import { PitchManagement } from "@/components/admin/PitchManagement"

export default async function AdminPitchesPage() {
  try {
    await requireAdmin()
  } catch (error) {
    redirect("/admin/login")
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Pitch Management</h1>
      <PitchManagement />
    </div>
  )
}

