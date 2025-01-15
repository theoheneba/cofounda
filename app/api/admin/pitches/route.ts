import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET(req: Request) {
  try {
    const pitches = await db.pitch.findMany({
      select: {
        id: true,
        title: true,
        founder: {
          select: {
            name: true,
          },
        },
        industry: true,
        stage: true,
        status: true,
      },
    })

    return NextResponse.json(pitches)
  } catch (error) {
    console.error("Error fetching pitches:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

