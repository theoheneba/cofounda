import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const resources = await db.resource.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(resources)
  } catch (error) {
    console.error("Error fetching resources:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

