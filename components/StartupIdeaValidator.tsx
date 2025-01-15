"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"

export function StartupIdeaValidator() {
  const [idea, setIdea] = useState("")
  const [feedback, setFeedback] = useState<null | { score: number; comments: string[] }>(null)

  const validateIdea = () => {
    // In a real application, this would call an API to analyze the idea
    // For this example, we'll use a simple scoring system
    const score = Math.floor(Math.random() * 100)
    const comments = [
      score > 80 ? "This idea has great potential!" : "There's room for improvement.",
      "Consider the market size and competition.",
      "Think about your unique value proposition.",
      "How will you monetize this idea?",
    ]
    setFeedback({ score, comments })
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Startup Idea Validator</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Describe your startup idea..."
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          className="mb-4"
        />
        <Button onClick={validateIdea} className="w-full">Validate Idea</Button>
        {feedback && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Idea Score:</h3>
            <Progress value={feedback.score} className="mb-2" />
            <p className="text-sm text-muted-foreground mb-2">{feedback.score}/100</p>
            <h3 className="font-semibold mb-2">Feedback:</h3>
            <ul className="list-disc list-inside">
              {feedback.comments.map((comment, index) => (
                <li key={index} className="text-sm">{comment}</li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

