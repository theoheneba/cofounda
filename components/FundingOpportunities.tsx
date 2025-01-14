"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ExternalLink } from 'lucide-react'

export function FundingOpportunities() {
  const opportunities = [
    {
      id: 1,
      name: 'Seed Round Investment',
      amount: '$50,000 - $200,000',
      deadline: '2024-02-15',
      status: 'Open',
    },
    {
      id: 2,
      name: 'Tech Startup Grant',
      amount: '$25,000',
      deadline: '2024-02-28',
      status: 'Open',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Funding Opportunities</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="p-4 rounded-lg border bg-card"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{opportunity.name}</h3>
                <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  {opportunity.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-1">Amount: {opportunity.amount}</p>
              <p className="text-sm text-muted-foreground mb-3">Deadline: {opportunity.deadline}</p>
              <Button className="w-full" variant="outline">
                Apply Now
                <ExternalLink className="ml-2 h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

