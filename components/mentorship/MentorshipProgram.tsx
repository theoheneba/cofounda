import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Mentor = {
  id: number
  name: string
  expertise: string[]
  bio: string
  availability: string
  avatar: string
}

export function MentorshipProgram() {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: 1,
      name: "Dr. Emily Chen",
      expertise: ["AI/ML", "EdTech", "Startup Scaling"],
      bio: "Former CTO of a successful EdTech startup, now angel investor and mentor.",
      availability: "2 hours/week",
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 2,
      name: "Michael Johnson",
      expertise: ["Product Management", "UX Design", "Go-to-Market Strategy"],
      bio: "20+ years in product management across Fortune 500 companies and startups.",
      availability: "1 hour/week",
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 3,
      name: "Sarah Williams",
      expertise: ["Venture Capital", "Financial Modeling", "Pitch Deck Creation"],
      bio: "Partner at a leading VC firm, specializing in early-stage tech startups.",
      availability: "3 hours/month",
      avatar: "/placeholder.svg?height=50&width=50"
    }
  ])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Mentorship Program</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="flex items-start space-x-4 p-4 border rounded-lg">
              <Avatar className="h-12 w-12">
                <AvatarImage src={mentor.avatar} alt={mentor.name} />
                <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{mentor.name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{mentor.bio}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {mentor.expertise.map((skill) => (
                    <Badge key={skill} variant="secondary">{skill}</Badge>
                  ))}
                </div>
                <p className="text-sm mt-2">Availability: {mentor.availability}</p>
              </div>
              <Button>Request Mentorship</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

