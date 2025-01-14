import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const currentUser = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { skills: true, interests: true },
  })

  if (!currentUser) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const recommendations = await prisma.user.findMany({
    where: {
      id: { not: currentUser.id },
      OR: [
        { skills: { some: { name: { in: currentUser.interests.map(i => i.name) } } } },
        { interests: { some: { name: { in: currentUser.skills.map(s => s.name) } } } },
      ],
    },
    include: {
      skills: true,
      interests: true,
    },
    take: 10,
  })

  // Calculate a simple compatibility score
  const scoredRecommendations = recommendations.map(user => {
    const skillMatch = user.skills.filter(skill => 
      currentUser.interests.some(interest => interest.name === skill.name)
    ).length
    const interestMatch = user.interests.filter(interest => 
      currentUser.skills.some(skill => skill.name === interest.name)
    ).length
    const score = skillMatch + interestMatch

    return { ...user, score }
  })

  // Sort by score in descending order
  scoredRecommendations.sort((a, b) => b.score - a.score)

  return NextResponse.json(scoredRecommendations)
}

