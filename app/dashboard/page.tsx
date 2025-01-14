import { CofounderMatches } from "@/components/CofounderMatches"
import { ProjectOverview } from "@/components/ProjectOverview"
import { SkillsAndExpertise } from "@/components/SkillsAndExpertise"
import { Messaging } from "@/components/Messaging"
import { EventsAndNetworking } from "@/components/EventsAndNetworking"
import { ResourceLibrary } from "@/components/ResourceLibrary"
import { FeedbackAndRatings } from "@/components/FeedbackAndRatings"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cofounder Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <CofounderMatches />
        </div>
        <div>
          <ProjectOverview />
        </div>
        <div>
          <SkillsAndExpertise />
        </div>
        <div className="lg:col-span-2">
          <Messaging />
        </div>
        <div>
          <EventsAndNetworking />
        </div>
        <div>
          <ResourceLibrary />
        </div>
        <div className="lg:col-span-2">
          <FeedbackAndRatings />
        </div>
      </div>
    </div>
  )
}

