import { PitchList } from "@/components/dashboard/PitchList"
import { MatchesList } from "@/components/dashboard/MatchesList"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { PendingConnections } from "@/components/dashboard/PendingConnections"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 pt-24">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-[#4A3333]">Dashboard</h1>
        <div className="flex gap-4">
          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm">
            <option>All Categories</option>
            <option>Technology</option>
            <option>E-commerce</option>
            <option>Healthcare</option>
            <option>Education</option>
          </select>
          <select className="rounded-md border border-gray-200 px-3 py-2 text-sm">
            <option>All Locations</option>
            <option>Remote</option>
            <option>United States</option>
            <option>Europe</option>
            <option>Asia</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DashboardStats />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <PitchList />
        </div>
        <div className="space-y-6">
          <MatchesList />
          <PendingConnections />
        </div>
      </div>
    </div>
  )
}

