import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Mentor = {
  id: string
  name: string
  avatar: string
  expertise: string[]
  bio: string
}

type MentorSpotlightProps = {
  mentor: Mentor
}

export function MentorSpotlight({ mentor }: MentorSpotlightProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Mentor Spotlight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Avatar className="h-32 w-32 mb-4">
              <AvatarImage src={mentor.avatar} alt={mentor.name} />
              <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <h3 className="text-xl font-semibold mb-2">{mentor.name}</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {mentor.expertise.map((skill) => (
                <Badge key={skill} variant="secondary">{skill}</Badge>
              ))}
            </div>
          </div>
          <div className="flex-1">
            <p className="text-muted-foreground mb-4">{mentor.bio}</p>
            <Button>Schedule a Session</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

