import { NextResponse } from "next/server"
import { prisma } from "@/app/lib/prisma"

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const user = await prisma.user.findUnique({
      where: { id: params.id },
      select: {
        id: true,
        name: true,
        bio: true,
        skills: true,
        interests: true,
        experience: true,
        location: true,
        linkedinUrl: true,
        githubUrl: true,
        projects: {
          select: {
            id: true,
            title: true,
            description: true,
            skills: true,
          },
        },
      },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    return NextResponse.json(user)
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

