'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Mentor = {
  id: string
  name: string
  skills: { name: string }[]
}

type MentorshipRequest = {
  id: string
  mentor: Mentor
  status: 'PENDING' | 'ACTIVE' | 'COMPLETED'
}

export function MentorshipProgram() {
  const [mentors, setMentors] = useState<Mentor[]>([])
  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequest[]>([])

  useEffect(() => {
    fetchMentors()
    fetchMentorshipRequests()
  }, [])

  const fetchMentors = async () => {
    const res = await fetch('/api/mentors')
    if (res.ok) {
      const data = await res.json()
      setMentors(data)
    }
  }

  const fetchMentorshipRequests = async () => {
    const res = await fetch('/api/mentorship-requests')
    if (res.ok) {
      const data = await res.json()
      setMentorshipRequests(data)
    }
  }

  const requestMentorship = async (mentorId: string) => {
    const res = await fetch('/api/mentorship-requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ mentorId }),
    })

    if (res.ok) {
      fetchMentorshipRequests()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Mentorship Program</h2>
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-2">Available Mentors</h3>
        <ul>
          {mentors.map((mentor) => (
            <li key={mentor.id} className="mb-4 p-4 border rounded">
              <h4 className="text-lg font-semibold">{mentor.name}</h4>
              <p>Skills: {mentor.skills.map(s => s.name).join(', ')}</p>
              <Button onClick={() => requestMentorship(mentor.id)} className="mt-2">
                Request Mentorship
              </Button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Your Mentorship Requests</h3>
        <ul>
          {mentorshipRequests.map((request) => (
            <li key={request.id} className="mb-4 p-4 border rounded">
              <h4 className="text-lg font-semibold">{request.mentor.name}</h4>
              <p>Status: {request.status}</p>
              {request.status === 'ACTIVE' && (
                <Button asChild className="mt-2">
                  <Link href={`/mentorship/${request.id}`}>View Mentorship</Link>
                </Button>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

