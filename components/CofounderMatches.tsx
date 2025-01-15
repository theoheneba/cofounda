import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function CofounderMatches() {
  const matches = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Technical Co-founder',
      skills: ['React', 'Node.js', 'AWS'],
      matchPercentage: 85,
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      name: 'Michael Chen',
      role: 'Business Development',
      skills: ['Marketing', 'Sales', 'Strategy'],
      matchPercentage: 78,
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Potential Cofounders</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {matches.map((match) => (
            <div
              key={match.id}
              className="flex items-center justify-between p-4 rounded-md hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar>
                  <AvatarImage src={match.avatar} alt={match.name} />
                  <AvatarFallback>{match.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{match.name}</p>
                  <p className="text-sm text-muted-foreground">{match.role}</p>
                  <div className="flex gap-1 mt-1">
                    {match.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">{match.matchPercentage}% Match</p>
                <Button size="sm" className="mt-2">Connect</Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

