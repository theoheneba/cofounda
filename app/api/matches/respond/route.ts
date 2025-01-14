import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { matchId, accept } = await req.json()

    if (!matchId) {
      return NextResponse.json({ error: "Missing match ID" }, { status: 400 })
    }

    const match = await prisma.match.findUnique({
      where: { id: matchId },
      include: { userOne: true, userTwo: true },
    })

    if (!match) {
      return NextResponse.json({ error: "Match not found" }, { status: 404 })
    }

    if (match.userTwoId !== session.user.id) {
      return NextResponse.json({ error: "Not authorized to respond to this match" }, { status: 403 })
    }

    const updatedMatch = await prisma.match.update({
      where: { id: matchId },
      data: { status: accept ? "ACCEPTED" : "REJECTED" },
    })

    // Create a notification for the user who initiated the match request
    await prisma.notification.create({
      data: {
        userId: match.userOneId,
        type: accept ? "MATCH_ACCEPTED" : "MATCH_REJECTED",
        content: `${session.user.name} has ${accept ? 'accepted' : 'rejected'} your match request`,
      },
    })

    return NextResponse.json(updatedMatch)
  } catch (error) {
    console.error("Error responding to match request:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

