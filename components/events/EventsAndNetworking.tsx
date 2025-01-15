import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Users } from 'lucide-react'

type Event = {
  id: number
  title: string
  date: string
  time: string
  location: string
  attendees: number
  category: string
  description: string
}

export function EventsAndNetworking() {
  const [events, setEvents] = useState<Event[]>([
    {
      id: 1,
      title: "Startup Pitch Night",
      date: "2023-07-15",
      time: "18:00",
      location: "Tech Hub, San Francisco",
      attendees: 150,
      category: "Networking",
      description: "Join us for an evening of exciting startup pitches and networking opportunities."
    },
    {
      id: 2,
      title: "AI in Startups Workshop",
      date: "2023-07-22",
      time: "14:00",
      location: "Virtual",
      attendees: 200,
      category: "Workshop",
      description: "Learn how to leverage AI technologies in your startup from industry experts."
    },
    {
      id: 3,
      title: "Founder Fireside Chat",
      date: "2023-07-29",
      time: "19:00",
      location: "Startup Incubator, New York",
      attendees: 100,
      category: "Talk",
      description: "An intimate discussion with successful founders about their entrepreneurial journey."
    }
  ])

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {events.map((event) => (
            <div key={event.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-lg">{event.title}</h3>
                <Badge>{event.category}</Badge>
              </div>
              <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
              <div className="flex flex-wrap gap-4 text-sm">
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
              <Button className="w-full mt-4">Register</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

