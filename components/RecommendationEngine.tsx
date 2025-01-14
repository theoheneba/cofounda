"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function RecommendationEngine() {
  const recommendations = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Technical Co-founder',
      skills: ['React', 'Node.js', 'AWS'],
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Development',
      skills: ['Marketing', 'Sales', 'Strategy'],
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Co-founders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((person) => (
            <div
              key={person.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={person.avatar} alt={person.name} />
                  <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{person.name}</p>
                  <p className="text-sm text-muted-foreground">{person.role}</p>
                  <div className="flex gap-1 mt-1">
                    {person.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <Button size="sm">Connect</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

