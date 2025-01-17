import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Mentor {
  name: string;
  title: string;
  company: string;
  bio: string;
  avatar: string;
  expertise: string[];
}

interface MentorSpotlightProps {
  mentor: Mentor;
}

export function MentorSpotlight({ mentor }: MentorSpotlightProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Mentor Spotlight</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-center md:items-start gap-6">
        <Avatar className="w-24 h-24">
          <AvatarImage src={mentor.avatar} alt={mentor.name} />
          <AvatarFallback>{mentor.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-xl font-semibold">{mentor.name}</h3>
          <p className="text-muted-foreground">{mentor.title} at {mentor.company}</p>
          <p className="mt-2">{mentor.bio}</p>
          <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
            {mentor.expertise.map((skill) => (
              <Badge key={skill} variant="secondary">{skill}</Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

