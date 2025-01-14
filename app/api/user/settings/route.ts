import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { emailNotifications, profileVisibility } = await req.json()

    const updatedSettings = await prisma.userSettings.upsert({
      where: { userId: session.user.id },
      update: {
        emailNotifications,
        profileVisibility,
      },
      create: {
        userId: session.user.id,
        emailNotifications,
        profileVisibility,
      },
    })

    return NextResponse.json(updatedSettings)
  } catch (error) {
    console.error("Error updating user settings:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

