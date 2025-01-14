'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type Match = {
  user: {
    id: string
    name: string
    skills: string[]
    interests: string[]
  }
  score: number
}

export default function MatchesPage() {
  const { data: session } = useSession()
  const [matches, setMatches] = useState<Match[]>([])

  useEffect(() => {
    const fetchMatches = async () => {
      const res = await fetch("/api/matches")
      if (res.ok) {
        const data = await res.json()
        setMatches(data)
      }
    }

    if (session) {
      fetchMatches()
    }
  }, [session])

  return (
    <div className="min-h-screen bg-[#FDF8F7]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-[#4A2515] mb-6">Potential Cofounders</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {matches.map((match) => (
            <div key={match.user.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#4A2515] mb-2">{match.user.name}</h2>
              <p className="text-[#4A2515]/80 mb-4">Match Score: {match.score}</p>
              <div className="mb-4">
                <h3 className="font-semibold text-[#4A2515]">Skills:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {match.user.skills.map((skill, index) => (
                    <span key={index} className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-[#4A2515]">Interests:</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {match.user.interests.map((interest, index) => (
                    <span key={index} className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <Button asChild className="w-full bg-[#B85C3C] hover:bg-[#A34E32]">
                <Link href={`/profile/${match.user.id}`}>View Profile</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

