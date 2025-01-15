import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type Achievement = {
  id: string
  name: string
  description: string
  completed: boolean
}

type UserProfileProps = {
  user: {
    name: string
    points: number
    level: number
    achievements: Achievement[]
  }
}

export function UserProfile({ user }: UserProfileProps) {
  const nextLevelPoints = (user.level + 1) * 1000
  const progress = (user.points / nextLevelPoints) * 100

  return (
    <Card>
      <CardHeader>
        <CardTitle>{user.name}'s Profile</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Level {user.level}</h3>
          <Progress value={progress} className="mt-2" />
          <p className="text-sm text-muted-foreground mt-1">
            {user.points} / {nextLevelPoints} points to next level
          </p>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Achievements</h3>
          <div className="space-y-2">
            {user.achievements.map((achievement) => (
              <div key={achievement.id} className="flex items-center">
                <Badge variant={achievement.completed ? 'default' : 'secondary'}>
                  {achievement.completed ? 'Completed' : 'Incomplete'}
                </Badge>
                <span className="ml-2 font-medium">{achievement.name}</span>
                <span className="ml-2 text-sm text-muted-foreground">{achievement.description}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

