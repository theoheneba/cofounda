import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const recentStartups = await db.startup.findMany({
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
        tags: true,
      },
    })

    return NextResponse.json(recentStartups)
  } catch (error) {
    console.error("Error fetching recent startups:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

