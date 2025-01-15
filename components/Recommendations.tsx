import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

type Recommendation = {
  id: string
  name: string
  role: string
  avatar: string
  matchScore: number
}

type RecommendationsProps = {
  recommendations: Recommendation[]
}

export function Recommendations({ recommendations }: RecommendationsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended for You</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((recommendation) => (
            <div key={recommendation.id} className="flex items-center space-x-4">
              <Avatar>
                <AvatarImage src={recommendation.avatar} alt={recommendation.name} />
                <AvatarFallback>{recommendation.name[0]}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h3 className="font-semibold">{recommendation.name}</h3>
                <p className="text-sm text-muted-foreground">{recommendation.role}</p>
              </div>
              <div className="text-sm font-medium">{recommendation.matchScore}% Match</div>
              <Button size="sm">Connect</Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

