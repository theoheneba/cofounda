import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type FeaturedPitchProps = {
  title: string
  description: string
  founderName: string
  founderAvatar: string
  industry: string
  fundingGoal: string
  pitchId: string
}

export function FeaturedPitch({
  title,
  description,
  founderName,
  founderAvatar,
  industry,
  fundingGoal,
  pitchId
}: FeaturedPitchProps) {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Featured Pitch</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-muted-foreground mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{industry}</Badge>
              <Badge variant="outline">{fundingGoal} funding goal</Badge>
            </div>
            <Button>View Full Pitch</Button>
          </div>
          <div className="flex flex-col items-center justify-center">
            <Avatar className="h-24 w-24 mb-2">
              <AvatarImage src={founderAvatar} alt={founderName} />
              <AvatarFallback>{founderName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <p className="font-semibold">{founderName}</p>
            <p className="text-sm text-muted-foreground">Founder</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

