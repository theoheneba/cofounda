import { notFound } from "next/navigation"
import { db } from "@/lib/db"

export default async function ProjectPage({ params }: { params: { id: string } }) {
  try {
    const project = await db.project.findUnique({
      where: { id: params.id },
      include: { owner: true },
    })

    if (!project) {
      notFound()
    }

    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">{project.name}</h1>
        <div className="grid gap-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p>{project.description}</p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">Owner</h2>
            <p>{project.owner.name}</p>
          </div>
          {/* Add more project details here */}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error fetching project:", error)
    return (
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Error</h1>
        <p>An error occurred while fetching the project. Please try again later.</p>
      </div>
    )
  }
}

