import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      projects: true,
      notifications: {
        where: { read: false },
        orderBy: { createdAt: 'desc' },
      },
    },
  })

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-[#FDF8F7]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-[#4A2515]">Welcome, {user.name}</h1>
            <div className="flex space-x-4">
              <Button
                asChild
                className="bg-[#B85C3C] hover:bg-[#A34E32]"
              >
                <Link href="/projects/new">Create Project</Link>
              </Button>
              <Button
                asChild
                className="bg-[#B85C3C] hover:bg-[#A34E32]"
              >
                <Link href="/matches">Find Cofounders</Link>
              </Button>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-semibold text-[#4A2515] mb-4">Notifications</h2>
            {user.notifications.length > 0 ? (
              <ul className="space-y-2">
                {user.notifications.map((notification) => (
                  <li key={notification.id} className="bg-[#FDF8F7] p-3 rounded-md">
                    <p className="text-[#4A2515]">{notification.content}</p>
                    <span className="text-sm text-[#4A2515]/60">{new Date(notification.createdAt).toLocaleString()}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[#4A2515]/80">No new notifications</p>
            )}
          </div>

          <h2 className="text-xl font-semibold text-[#4A2515] mb-4">Your Projects</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {user.projects.map((project) => (
              <div
                key={project.id}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold text-lg text-[#4A2515] mb-2">
                  {project.title}
                </h3>
                <p className="text-[#4A2515]/80 mb-4">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {user.projects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#4A2515]/80 mb-4">
                You haven't created any projects yet.
              </p>
              <Button
                asChild
                className="bg-[#B85C3C] hover:bg-[#A34E32]"
              >
                <Link href="/projects/new">Create Your First Project</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

