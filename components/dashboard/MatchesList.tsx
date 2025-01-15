import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function MatchesList() {
  const matches = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Technical Co-founder",
      skills: ["React", "Node.js", "AWS"],
      matchScore: 85,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Business Development",
      skills: ["Marketing", "Sales", "Strategy"],
      matchScore: 78,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <div key={match.id} className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent">
              <Avatar>
                <AvatarImage src={match.avatar} alt={match.name} />
                <AvatarFallback>{match.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-medium text-sm">{match.name}</h4>
                    <p className="text-xs text-muted-foreground">{match.role}</p>
                  </div>
                  <Badge variant="secondary">{match.matchScore}% Match</Badge>
                </div>
                <div className="flex flex-wrap gap-1 mt-2">
                  {match.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <Button size="sm" className="w-full mt-3 bg-[#E27D60] hover:bg-[#c66a51]">
                  Connect
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

