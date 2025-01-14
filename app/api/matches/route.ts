import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/lib/auth"
import { findMatches } from "@/app/services/matchingService"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const matches = await findMatches(session.user.id)

    return NextResponse.json(matches)
  } catch (error) {
    console.error("Error in fetching matches:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

