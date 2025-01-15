import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function POST(req: Request) {
  try {
    const { userId } = await req.json()

    // Fetch the user's profile
    const user = await db.user.findUnique({
      where: { id: userId },
      include: { skills: true, interests: true }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Find potential matches based on skills and interests
    const potentialMatches = await db.user.findMany({
      where: {
        id: { not: userId },
        OR: [
          { skills: { some: { id: { in: user.skills.map(s => s.id) } } } },
          { interests: { some: { id: { in: user.interests.map(i => i.id) } } } }
        ]
      },
      include: { skills: true, interests: true }
    })

    // Calculate match scores
    const matches = potentialMatches.map(match => {
      const skillScore = match.skills.filter(s => user.skills.some(us => us.id === s.id)).length
      const interestScore = match.interests.filter(i => user.interests.some(ui => ui.id === i.id)).length
      const totalScore = skillScore + interestScore

      return {
        user: {
          id: match.id,
          name: match.name,
          avatar: match.avatar,
          role: match.role
        },
        matchScore: totalScore
      }
    })

    // Sort matches by score in descending order
    matches.sort((a, b) => b.matchScore - a.matchScore)

    return NextResponse.json(matches.slice(0, 10)) // Return top 10 matches
  } catch (error) {
    console.error("Error in matching algorithm:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

