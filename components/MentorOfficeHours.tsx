import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const upcomingOfficeHours = [
  { id: 1, mentor: "John Smith", expertise: "Marketing", date: "2023-07-16" },
  { id: 2, mentor: "Emily Chen", expertise: "Product Management", date: "2023-07-18" },
  { id: 3, mentor: "Michael Johnson", expertise: "Fundraising", date: "2023-07-20" },
]

export function MentorOfficeHours() {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Mentor Office Hours</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {upcomingOfficeHours.map((session) => (
            <li key={session.id} className="flex justify-between items-center">
              <div>
                <span className="font-medium">{session.mentor}</span>
                <span className="text-sm text-muted-foreground ml-2">({session.expertise})</span>
              </div>
              <span>{session.date}</span>
            </li>
          ))}
        </ul>
        <Link href="/mentor-office-hours">
          <Button>Book a Session</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

