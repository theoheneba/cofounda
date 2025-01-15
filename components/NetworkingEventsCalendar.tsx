"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

type Event = {
  id: number
  title: string
  date: Date
  type: 'webinar' | 'meetup' | 'conference'
}

export function NetworkingEventsCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  
  const events: Event[] = [
    { id: 1, title: "Startup Funding Webinar", date: new Date(2023, 6, 15), type: 'webinar' },
    { id: 2, title: "Tech Meetup", date: new Date(2023, 6, 20), type: 'meetup' },
    { id: 3, title: "Entrepreneurship Conference", date: new Date(2023, 7, 5), type: 'conference' },
    // Add more events as needed
  ]

  const selectedDateEvents = events.filter(
    event => selectedDate && event.date.toDateString() === selectedDate.toDateString()
  )

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Networking Events Calendar</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold mb-2">Events on {selectedDate?.toDateString()}</h3>
          <ScrollArea className="h-[300px]">
            {selectedDateEvents.length > 0 ? (
              selectedDateEvents.map(event => (
                <div key={event.id} className="mb-4 p-3 border rounded-md">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium">{event.title}</h4>
                    <Badge>{event.type}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    {event.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                  <Button size="sm" className="mt-2">Register</Button>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground">No events scheduled for this date.</p>
            )}
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  )
}

