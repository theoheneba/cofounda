import { getServerSession } from "next-auth/next"
import { NextResponse } from "next/server"
import { authOptions } from "@/app/lib/auth"
import { prisma } from "@/app/lib/prisma"

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const query = searchParams.get('query')
    const skills = searchParams.get('skills')?.split(',') || []
    const interests = searchParams.get('interests')?.split(',') || []

    const users = await prisma.user.findMany({
      where: {
        AND: [
          { id: { not: session.user.id } },
          {
            OR: [
              { name: { contains: query, mode: 'insensitive' } },
              { bio: { contains: query, mode: 'insensitive' } },
            ],
          },
          skills.length > 0 ? { skills: { hasSome: skills } } : {},
          interests.length > 0 ? { interests: { hasSome: interests } } : {},
        ],
      },
      select: {
        id: true,
        name: true,
        bio: true,
        skills: true,
        interests: true,
        location: true,
      },
    })

    return NextResponse.json(users)
  } catch (error) {
    console.error("Error searching users:", error)
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 })
  }
}

