import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

interface Startup {
  id: string;
  name: string;
  description: string;
  founderName: string;
  founderAvatar: string;
  tags: string[];
}

interface FeaturedStartupsProps {
  startups: Startup[];
}

export function FeaturedStartups({ startups }: FeaturedStartupsProps) {
  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-6">Featured Startups</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((startup) => (
          <Card key={startup.id}>
            <CardHeader>
              <CardTitle>{startup.name}</CardTitle>
              <CardDescription>{startup.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center space-x-4 mb-4">
                <Avatar>
                  <AvatarImage src={startup.founderAvatar} alt={startup.founderName} />
                  <AvatarFallback>{startup.founderName[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{startup.founderName}</p>
                  <p className="text-sm text-muted-foreground">Founder</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {startup.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">{tag}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

