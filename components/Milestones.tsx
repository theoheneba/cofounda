"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function Milestones() {
  const milestones = [
    { id: 1, title: 'MVP Development', progress: 75 },
    { id: 2, title: 'User Testing', progress: 30 },
    { id: 3, title: 'Market Research', progress: 100 },
    { id: 4, title: 'Initial Launch', progress: 0 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Milestones</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {milestones.map((milestone) => (
            <div key={milestone.id} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{milestone.title}</span>
                <span>{milestone.progress}%</span>
              </div>
              <Progress value={milestone.progress} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

