import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const featuredMentor = await db.mentor.findFirst({
      where: { featured: true },
      include: {
        expertise: true,
      },
    })

    if (!featuredMentor) {
      return NextResponse.json({ error: "No featured mentor found" }, { status: 404 })
    }

    return NextResponse.json(featuredMentor)
  } catch (error) {
    console.error("Error fetching featured mentor:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

