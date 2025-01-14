'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Event = {
  id: string
  name: string
  description: string
  date: string
  location: string
  type: 'VIRTUAL' | 'IN_PERSON'
}

export function EventsAndNetworking() {
  const [events, setEvents] = useState<Event[]>([])

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    const res = await fetch('/api/events')
    if (res.ok) {
      const data = await res.json()
      setEvents(data)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Events and Networking</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {events.map((event) => (
          <li key={event.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{event.name}</h3>
            <p className="mt-2">{event.description}</p>
            <p className="text-sm text-gray-600 mt-2">Date: {new Date(event.date).toLocaleString()}</p>
            <p className="text-sm text-gray-600">Location: {event.location}</p>
            <p className="text-sm text-gray-600">Type: {event.type === 'VIRTUAL' ? 'Virtual' : 'In-Person'}</p>
            <Button asChild className="mt-4">
              <Link href={`/events/${event.id}`}>RSVP</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

