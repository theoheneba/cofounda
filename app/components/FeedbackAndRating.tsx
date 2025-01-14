'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from 'lucide-react'

type Feedback = {
  id: string
  fromUserId: string
  toUserId: string
  rating: number
  comment: string
  createdAt: string
}

export function FeedbackAndRating({ userId }: { userId: string }) {
  const [feedback, setFeedback] = useState<Feedback[]>([])
  const [newFeedback, setNewFeedback] = useState({ rating: 0, comment: '' })

  useEffect(() => {
    fetchFeedback()
  }, [userId])

  const fetchFeedback = async () => {
    const res = await fetch(`/api/feedback/${userId}`)
    if (res.ok) {
      const data = await res.json()
      setFeedback(data)
    }
  }

  const submitFeedback = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...newFeedback, toUserId: userId }),
    })

    if (res.ok) {
      setNewFeedback({ rating: 0, comment: '' })
      fetchFeedback()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Feedback and Ratings</h2>
      <form onSubmit={submitFeedback} className="mb-8">
        <div className="mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`inline-block cursor-pointer ${
                star <= newFeedback.rating ? 'text-yellow-400' : 'text-gray-300'
              }`}
              onClick={() => setNewFeedback({ ...newFeedback, rating: star })}
            />
          ))}
        </div>
        <Textarea
          value={newFeedback.comment}
          onChange={(e) => setNewFeedback({ ...newFeedback, comment: e.target.value })}
          placeholder="Leave your feedback..."
          className="mb-2"
        />
        <Button type="submit">Submit Feedback</Button>
      </form>
      <ul>
        {feedback.map((item) => (
          <li key={item.id} className="mb-4 p-4 border rounded">
            <div className="mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <StarIcon
                  key={star}
                  className={`inline-block ${
                    star <= item.rating ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <p>{item.comment}</p>
            <p className="text-sm text-gray-500 mt-2">
              Posted on {new Date(item.createdAt).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}

