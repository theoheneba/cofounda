import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const recentProjects = await db.project.findMany({
      take: 3,
      orderBy: { createdAt: 'desc' },
      include: {
        founders: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
      },
    })

    return NextResponse.json(recentProjects)
  } catch (error) {
    console.error("Error fetching recent projects:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

