"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, MapPin, Users } from 'lucide-react'

export function EventsAndNetworking() {
  const events = [
    {
      id: 1,
      name: 'Cofounder Networking Mixer',
      date: '2024-01-25',
      time: '18:00',
      location: 'Tech Hub, Accra',
      attendees: 45,
    },
    {
      id: 2,
      name: 'Startup Pitch Practice',
      date: '2024-01-30',
      time: '14:00',
      location: 'Virtual',
      attendees: 30,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Events & Networking</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <div
              key={event.id}
              className="p-4 rounded-lg border bg-card"
            >
              <h3 className="font-medium mb-2">{event.name}</h3>
              <div className="space-y-2 text-sm text-muted-foreground mb-3">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {event.date} at {event.time}
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees} attending
                </div>
              </div>
              <Button className="w-full">Register</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

