import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type MatchedUser = {
  id: number
  name: string
  title: string
  matchScore: number
  skills: string[]
  avatar: string
}

export function MatchingAlgorithm() {
  const [matches, setMatches] = useState<MatchedUser[]>([])

  const findMatches = () => {
    // In a real application, this would call your backend API
    // For now, we'll simulate some matches
    const simulatedMatches: MatchedUser[] = [
      {
        id: 1,
        name: "Sarah Johnson",
        title: "UX Designer",
        matchScore: 92,
        skills: ["UI/UX", "Figma", "User Research"],
        avatar: "/placeholder.svg?height=50&width=50"
      },
      {
        id: 2,
        name: "Michael Chen",
        title: "Full Stack Developer",
        matchScore: 88,
        skills: ["React", "Node.js", "MongoDB"],
        avatar: "/placeholder.svg?height=50&width=50"
      },
      {
        id: 3,
        name: "Emily Rodriguez",
        title: "Product Manager",
        matchScore: 85,
        skills: ["Agile", "Data Analysis", "Go-to-Market Strategy"],
        avatar: "/placeholder.svg?height=50&width=50"
      }
    ]
    setMatches(simulatedMatches)
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Find Your Co-Founder Match</CardTitle>
        <Button onClick={findMatches}>Find Matches</Button>
      </CardHeader>
      <CardContent>
        {matches.length === 0 ? (
          <p className="text-center text-muted-foreground">
            Click "Find Matches" to discover potential co-founders!
          </p>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => (
              <div key={match.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={match.avatar} alt={match.name} />
                  <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold">{match.name}</h3>
                  <p className="text-sm text-muted-foreground">{match.title}</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {match.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold text-green-600">{match.matchScore}%</span>
                  <p className="text-sm text-muted-foreground">Match</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

