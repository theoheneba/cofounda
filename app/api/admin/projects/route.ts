import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const projects = await db.project.findMany({
      select: {
        id: true,
        name: true,
        founders: {
          select: {
            name: true,
          },
        },
        industry: true,
        stage: true,
        status: true,
      },
    })

    const formattedProjects = projects.map(project => ({
      ...project,
      founders: project.founders.map(founder => founder.name).join(", "),
    }))

    return NextResponse.json(formattedProjects)
  } catch (error) {
    console.error("Error fetching projects:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

