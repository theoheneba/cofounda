import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const upcomingEvents = await db.event.findMany({
      where: {
        date: {
          gte: new Date(),
        },
      },
      orderBy: {
        date: 'asc',
      },
      take: 3,
    })

    return NextResponse.json(upcomingEvents)
  } catch (error) {
    console.error("Error fetching upcoming events:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

