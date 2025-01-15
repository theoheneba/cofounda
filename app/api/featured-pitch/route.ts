import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const featuredPitch = await db.pitch.findFirst({
      where: { featured: true },
      include: {
        founder: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })

    if (!featuredPitch) {
      return NextResponse.json({ error: "No featured pitch found" }, { status: 404 })
    }

    return NextResponse.json(featuredPitch)
  } catch (error) {
    console.error("Error fetching featured pitch:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

