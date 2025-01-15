import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar } from 'lucide-react'

type Mentor = {
  id: number
  name: string
  expertise: string[]
  availableSlots: string[]
  avatar: string
}

export function VirtualOfficeHours() {
  const [mentors, setMentors] = useState<Mentor[]>([
    {
      id: 1,
      name: "Dr. Emily Chen",
      expertise: ["AI/ML", "EdTech"],
      availableSlots: ["2023-07-15 14:00", "2023-07-16 10:00", "2023-07-17 16:00"],
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 2,
      name: "Michael Johnson",
      expertise: ["Product Management", "UX Design"],
      availableSlots: ["2023-07-14 11:00", "2023-07-15 15:00", "2023-07-18 13:00"],
      avatar: "/placeholder.svg?height=50&width=50"
    },
    {
      id: 3,
      name: "Sarah Williams",
      expertise: ["Venture Capital", "Financial Modeling"],
      availableSlots: ["2023-07-16 09:00", "2023-07-17 14:00", "2023-07-19 11:00"],
      avatar: "/placeholder.svg?height=50&width=50"
    }
  ])

  const bookSlot = (mentorId: number, slot: string) => {
    setMentors(mentors.map(mentor => 
      mentor.id === mentorId
        ? { ...mentor, availableSlots: mentor.availableSlots.filter(s => s !== slot) }
        : mentor
    ))
    // Here you would typically also send this booking to your backend
    console.log(`Booked slot ${slot} with mentor ${mentorId}`)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Virtual Office Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="border rounded-lg p-4">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={mentor.avatar} alt={mentor.name} />
                  <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold">{mentor.name}</h3>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {mentor.expertise.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                {mentor.availableSlots.map((slot) => (
                  <div key={slot} className="flex items-center justify-between bg-secondary p-2 rounded-md">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(slot).toLocaleString()}</span>
                    </div>
                    <Button size="sm" onClick={() => bookSlot(mentor.id, slot)}>
                      Book Slot
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

