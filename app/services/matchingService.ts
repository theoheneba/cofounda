import { prisma } from "@/app/lib/prisma"

export async function findMatches(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: { projects: true }
  })

  if (!user) throw new Error("User not found")

  const potentialMatches = await prisma.user.findMany({
    where: {
      id: { not: userId },
      skills: { hasSome: user.interests },
      interests: { hasSome: user.skills }
    },
    include: { projects: true }
  })

  return potentialMatches.map(match => {
    const score = calculateMatchScore(user, match)
    return { user: match, score }
  }).sort((a, b) => b.score - a.score)
}

function calculateMatchScore(user1: any, user2: any) {
  let score = 0

  // Skills and interests match
  score += countCommonElements(user1.skills, user2.interests) * 2
  score += countCommonElements(user1.interests, user2.skills) * 2

  // Location match
  if (user1.location === user2.location) score += 5

  // Project similarity
  const projectSimilarity = calculateProjectSimilarity(user1.projects, user2.projects)
  score += projectSimilarity * 3

  return score
}

function countCommonElements(arr1: string[], arr2: string[]) {
  return arr1.filter(item => arr2.includes(item)).length
}

function calculateProjectSimilarity(projects1: any[], projects2: any[]) {
  let similarity = 0
  for (const p1 of projects1) {
    for (const p2 of projects2) {
      similarity += countCommonElements(p1.skills, p2.skills)
    }
  }
  return similarity
}

