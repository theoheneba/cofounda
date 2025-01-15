import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

type Match = {
  user: {
    id: string
    name: string
    avatar: string
    role: string
  }
  matchScore: number
}

export function MatchResults() {
  const [matches, setMatches] = useState<Match[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('/api/match', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: 'current-user-id' }) // Replace with actual user ID
        })
        if (!response.ok) throw new Error('Failed to fetch matches')
        const data = await response.json()
        setMatches(data)
      } catch (error) {
        console.error('Error fetching matches:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchMatches()
  }, [])

  if (isLoading) return <div className="text-center text-muted-foreground">Loading matches...</div>

  return (
    <Card className="bg-card">
      <CardHeader>
        <CardTitle className="text-foreground">Your Top Matches</CardTitle>
      </CardHeader>
      <CardContent>
        {matches.map((match) => (
          <div key={match.user.id} className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={match.user.avatar} alt={match.user.name} />
              <AvatarFallback>{match.user.name[0]}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{match.user.name}</h3>
              <p className="text-sm text-muted-foreground">{match.user.role}</p>
              <Progress value={match.matchScore} className="mt-2" />
            </div>
            <Button variant="outline">Connect</Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

