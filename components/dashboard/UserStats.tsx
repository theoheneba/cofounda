import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type UserStatsProps = {
  followers: number
  following: number
}

export function UserStats({ followers, following }: UserStatsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Network</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-around">
          <div className="text-center">
            <p className="text-3xl font-bold">{followers}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold">{following}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

