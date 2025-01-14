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

    const { targetUserId } = await req.json()

    if (!targetUserId) {
      return NextResponse.json({ error: "Missing target user ID" }, { status: 400 })
    }

    // Check if a match already exists
    const existingMatch = await prisma.match.findFirst({
      where: {
        OR: [
          { userOneId: session.user.id, userTwoId: targetUserId },
          { userOneId: targetUserId, userTwoId: session.user.id },
        ],
      },
    })

    if (existingMatch) {
      return NextResponse.json({ error: "Match already exists" }, { status: 400 })
    }

    // Create a new match request
    const newMatch = await prisma.match.create({
      data: {
        userOneId: session.user.id,
        userTwoId: targetUserId,
        status: "PENDING",
      },
    })

    // Create a notification for the target user
    await prisma.notification.create({
      data: {
        userId: targetUserId,
        type: "MATCH_REQUEST",
        content: `You have a new match request from ${session.user.name}`,
      },
    })

    return NextResponse.json(newMatch, { status: 201 })
  } catch (error) {
    console.error("Error creating match request:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

