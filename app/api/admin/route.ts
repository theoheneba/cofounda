import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        createdAt: true,
      },
    })

    const projects = await prisma.project.findMany({
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    })

    return NextResponse.json({ users, projects })
  } catch (error) {
    console.error("Error fetching admin data:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { userId, action } = await req.json()

    if (action === "promoteToAdmin") {
      await prisma.user.update({
        where: { id: userId },
        data: { role: "ADMIN" },
      })
    } else if (action === "demoteToUser") {
      await prisma.user.update({
        where: { id: userId },
        data: { role: "USER" },
      })
    } else if (action === "deleteUser") {
      await prisma.user.delete({
        where: { id: userId },
      })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error performing admin action:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

