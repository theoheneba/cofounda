'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Recommendation = {
  id: string
  name: string
  score: number
  skills: { name: string }[]
  interests: { name: string }[]
}

export function Recommendations() {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])

  useEffect(() => {
    fetchRecommendations()
  }, [])

  const fetchRecommendations = async () => {
    const res = await fetch('/api/recommendations')
    if (res.ok) {
      const data = await res.json()
      setRecommendations(data)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Recommended Co-Founders</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((recommendation) => (
          <li key={recommendation.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{recommendation.name}</h3>
            <p className="text-sm text-gray-600">Compatibility Score: {recommendation.score}</p>
            <div className="mt-2">
              <h4 className="font-semibold">Skills:</h4>
              <p>{recommendation.skills.map(s => s.name).join(', ')}</p>
            </div>
            <div className="mt-2">
              <h4 className="font-semibold">Interests:</h4>
              <p>{recommendation.interests.map(i => i.name).join(', ')}</p>
            </div>
            <Button asChild className="mt-4">
              <Link href={`/profile/${recommendation.id}`}>View Profile</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

