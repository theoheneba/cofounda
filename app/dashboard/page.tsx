import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"
import { Chat } from "@/components/Chat"
import { TaskList } from "@/components/TaskList"
import { Milestones } from "@/components/Milestones"
import { DocumentSharing } from "@/components/DocumentSharing"
import { SkillAssessment } from "@/components/SkillAssessment"
import { Recommendations } from "@/components/Recommendations"
import { MentorshipProgram } from "@/components/MentorshipProgram"
import { FundingOpportunities } from "@/components/FundingOpportunities"
import { EventsAndNetworking } from "@/components/EventsAndNetworking"
import { ResourceLibrary } from "@/components/ResourceLibrary"
import { FeedbackAndRating } from "@/components/FeedbackAndRating"
import { ExternalPlatformIntegration } from "@/components/ExternalPlatformIntegration"
import { AnalyticsDashboard } from "@/components/AnalyticsDashboard"
import { SubscriptionManager } from "@/components/SubscriptionManager"
import { StartupIdeaGenerator } from "@/components/StartupIdeaGenerator"
import { PitchDeckBuilder } from "@/components/PitchDeckBuilder"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      projects: true,
      // mentorRelationships: true,
      // menteeRelationships: true,
      // subscription: true,
    },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#FDF8F7] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-[#4A2515] mb-8">Welcome, {user.name}</h1>
        
        <div className="bg-white shadow-md rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#4A2515] mb-4">Your Projects</h2>
          {user.projects.length > 0 ? (
            <ul className="space-y-4">
              {user.projects.map((project) => (
                <li key={project.id} className="border-b pb-4">
                  <h3 className="text-xl font-medium text-[#4A2515]">{project.title}</h3>
                  <p className="text-[#4A2515]/80">{project.description}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-[#4A2515]/80">You haven't created any projects yet.</p>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <SubscriptionManager />
          </div>

          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <Recommendations />
          </div>
          
          <div>
            <TaskList projectId={user.projects[0]?.id} />
          </div>
          
          <div>
            <Milestones projectId={user.projects[0]?.id} />
          </div>
          
          <div>
            <DocumentSharing projectId={user.projects[0]?.id} />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <SkillAssessment />
          </div>
          
          <div>
            <MentorshipProgram />
          </div>
          
          <div>
            <FundingOpportunities />
          </div>
          
          <div>
            <EventsAndNetworking />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ResourceLibrary />
          </div>
          
          <div>
            <FeedbackAndRating userId={session.user.id} />
          </div>
          
          <div>
            <ExternalPlatformIntegration />
          </div>
          
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <AnalyticsDashboard />
          </div>

          {user.subscription && (user.subscription.plan === 'GOLD' || user.subscription.plan === 'PREMIUM') && (
            <>
              <div>
                <StartupIdeaGenerator />
              </div>
              <div className="col-span-1 md:col-span-2">
                <PitchDeckBuilder />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

