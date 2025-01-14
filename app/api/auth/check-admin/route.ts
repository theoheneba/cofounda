import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/app/lib/prisma"
import { authOptions } from "@/app/lib/auth"

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)

  if (!session) {
    return NextResponse.json({ isAdmin: false }, { status: 401 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { role: true },
  })

  if (!user) {
    return NextResponse.json({ isAdmin: false }, { status: 404 })
  }

  return NextResponse.json({ isAdmin: user.role === 'ADMIN' })
}

