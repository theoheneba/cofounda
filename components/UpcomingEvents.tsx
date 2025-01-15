import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CalendarIcon, MapPinIcon, UsersIcon } from 'lucide-react'

type Event = {
  id: string
  title: string
  date: string
  location: string
  attendees: number
}

type UpcomingEventsProps = {
  events: Event[]
}

export function UpcomingEvents({ events }: UpcomingEventsProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {events.map((event) => (
            <Card key={event.id}>
              <CardContent className="flex flex-col md:flex-row justify-between items-center p-4">
                <div>
                  <h3 className="font-semibold mb-2">{event.title}</h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    {event.date}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-1">
                    <MapPinIcon className="w-4 h-4 mr-2" />
                    {event.location}
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <UsersIcon className="w-4 h-4 mr-2" />
                    {event.attendees} attendees
                  </div>
                </div>
                <Button className="mt-4 md:mt-0">Register</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

