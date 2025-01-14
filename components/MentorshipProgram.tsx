"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Calendar } from 'lucide-react'

export function MentorshipProgram() {
  const sessions = [
    {
      id: 1,
      mentor: 'David Wilson',
      topic: 'Startup Funding Strategies',
      date: '2024-01-20',
      time: '15:00',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      mentor: 'Lisa Zhang',
      topic: 'Product Market Fit',
      date: '2024-01-22',
      time: '16:30',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mentorship Sessions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sessions.map((session) => (
            <div
              key={session.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={session.avatar} alt={session.mentor} />
                  <AvatarFallback>{session.mentor.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{session.topic}</p>
                  <p className="text-sm text-muted-foreground">with {session.mentor}</p>
                  <div className="flex items-center mt-1 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3 mr-1" />
                    {session.date} at {session.time}
                  </div>
                </div>
              </div>
              <Button size="sm">Join</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

