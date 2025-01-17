import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const upcomingEvents = [
  { id: 1, name: "Startup Pitch Night", date: "2023-07-15" },
  { id: 2, name: "Tech Meetup", date: "2023-07-22" },
  { id: 3, name: "Investor Networking", date: "2023-07-29" },
]

export function NetworkingEventsCalendar() {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upcoming Networking Events</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {upcomingEvents.map((event) => (
            <li key={event.id} className="flex justify-between items-center">
              <span>{event.name}</span>
              <span className="text-muted-foreground">{event.date}</span>
            </li>
          ))}
        </ul>
        <Link href="/events">
          <Button>View All Events</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

