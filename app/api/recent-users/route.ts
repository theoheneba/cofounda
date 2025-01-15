import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const recentUsers = await db.user.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        avatar: true,
        role: true,
        expertise: true,
      },
    })

    return NextResponse.json(recentUsers)
  } catch (error) {
    console.error("Error fetching recent users:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

