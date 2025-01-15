import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Star } from 'lucide-react'

export function FeedbackAndRatings() {
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
        <CardTitle className="text-2xl">Feedback & Ratings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {feedback.map((item) => (
          <div key={item.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">{item.name}</h3>
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < item.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <p className="text-gray-600">{item.comment}</p>
            <p className="text-sm text-gray-500">{item.date}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

