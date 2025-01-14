"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

export function FeedbackAndRating() {
  const feedback = [
    {
      id: 1,
      name: 'John Smith',
      rating: 5,
      comment: 'Great collaboration and communication skills.',
      date: '2024-01-10',
    },
    {
      id: 2,
      name: 'Emma Wilson',
      rating: 4,
      comment: 'Strong technical knowledge and dedication.',
      date: '2024-01-08',
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feedback & Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {feedback.map((item) => (
            <div key={item.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="font-medium">{item.name}</p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground">{item.comment}</p>
              <p className="text-xs text-muted-foreground">{item.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

