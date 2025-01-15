"use client"

import { useState, useEffect } from 'react'

type Stats = {
  startupsFounded: number
  coFoundersMatched: number
  fundingRaised: number
  countriesRepresented: number
}

export function StatsCounter() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/stats')
        if (!response.ok) {
          throw new Error('Failed to fetch stats')
        }
        const data = await response.json()
        setStats(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (isLoading) return <div>Loading stats...</div>
  if (error) return <div>Error: {error}</div>
  if (!stats) return null

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="text-center">
        <p className="text-4xl font-bold mb-2">{stats.startupsFounded.toLocaleString()}</p>
        <p className="text-lg">Startups Founded</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold mb-2">{stats.coFoundersMatched.toLocaleString()}</p>
        <p className="text-lg">Co-Founders Matched</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold mb-2">${stats.fundingRaised.toLocaleString()}M+</p>
        <p className="text-lg">Funding Raised</p>
      </div>
      <div className="text-center">
        <p className="text-4xl font-bold mb-2">{stats.countriesRepresented.toLocaleString()}</p>
        <p className="text-lg">Countries Represented</p>
      </div>
    </div>
  )
}

