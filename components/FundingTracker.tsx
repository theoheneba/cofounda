import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

type FundingRound = {
  id: string
  name: string
  targetAmount: number
  raisedAmount: number
  status: 'active' | 'completed' | 'planned'
}

type FundingTrackerProps = {
  fundingData: FundingRound[]
}

export function FundingTracker({ fundingData }: FundingTrackerProps) {
  return (
    <div className="space-y-6">
      {fundingData.map((round) => (
        <Card key={round.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{round.name}</span>
              <Badge variant={round.status === 'active' ? 'default' : round.status === 'completed' ? 'success' : 'secondary'}>
                {round.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between mb-2">
              <span>Target: ${round.targetAmount.toLocaleString()}</span>
              <span>Raised: ${round.raisedAmount.toLocaleString()}</span>
            </div>
            <Progress value={(round.raisedAmount / round.targetAmount) * 100} />
            <p className="text-right mt-2 text-sm text-muted-foreground">
              {((round.raisedAmount / round.targetAmount) * 100).toFixed(2)}% Complete
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

