import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const [totalUsers, activePitches, matchesMade, activeProjects] = await Promise.all([
      db.user.count(),
      db.pitch.count({ where: { status: "Active" } }),
      db.match.count(),
      db.project.count({ where: { status: "Active" } }),
    ])

    return NextResponse.json({
      totalUsers,
      activePitches,
      matchesMade,
      activeProjects,
    })
  } catch (error) {
    console.error("Error fetching dashboard stats:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

