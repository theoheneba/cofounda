import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const skillsListings = await db.skillListing.findMany({
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
        skills: true,
      },
    })

    return NextResponse.json(skillsListings)
  } catch (error) {
    console.error("Error fetching skills listings:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

