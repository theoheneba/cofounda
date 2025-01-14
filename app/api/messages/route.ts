import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"
import { pusher } from "@/app/lib/pusher"

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { content, receiverId } = await req.json()

    if (!content || !receiverId) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const message = await prisma.message.create({
      data: {
        content,
        senderId: session.user.id,
        receiverId,
      },
    })

    // Trigger a Pusher event
    await pusher.trigger(`private-user-${receiverId}`, "new-message", message)

    return NextResponse.json(message, { status: 201 })
  } catch (error) {
    console.error("Error in sending message:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

