import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from 'lucide-react'

type Feedback = {
  id: number
  user: string
  avatar: string
  rating: number
  comment: string
  date: string
}

export function FeedbackAndRating() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: 1,
      user: "John Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 5,
      comment: "Great collaboration! Very knowledgeable and professional.",
      date: "2023-06-10"
    },
    {
      id: 2,
      user: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: 4,
      comment: "Good communication skills and technical expertise.",
      date: "2023-06-08"
    }
  ])

  const [newRating, setNewRating] = useState(0)
  const [newComment, setNewComment] = useState("")

  const submitFeedback = () => {
    if (newRating === 0 || newComment.trim() === "") return

    const feedback: Feedback = {
      id: feedbacks.length + 1,
      user: "You",
      avatar: "/placeholder.svg?height=40&width=40",
      rating: newRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    }

    setFeedbacks([feedback, ...feedbacks])
    setNewRating(0)
    setNewComment("")
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Feedback & Ratings</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Leave Your Feedback</h3>
          <div className="flex mb-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                className={`h-6 w-6 cursor-pointer ${
                  star <= newRating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                }`}
                onClick={() => setNewRating(star)}
              />
            ))}
          </div>
          <Textarea
            placeholder="Write your feedback here..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mb-2"
          />
          <Button onClick={submitFeedback}>Submit Feedback</Button>
        </div>
        <div className="space-y-4">
          {feedbacks.map((feedback) => (
            <div key={feedback.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Avatar className="h-8 w-8 mr-2">
                    <AvatarImage src={feedback.avatar} alt={feedback.user} />
                    <AvatarFallback>{feedback.user[0]}</AvatarFallback>
                  </Avatar>
                  <span className="font-semibold">{feedback.user}</span>
                </div>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= feedback.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{feedback.comment}</p>
              <p className="text-xs text-muted-foreground">{feedback.date}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

