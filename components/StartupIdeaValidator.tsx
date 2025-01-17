import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function StartupIdeaValidator() {
  const [idea, setIdea] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the idea to your backend for analysis
    console.log("Validating idea:", idea)
    // For demo purposes, we'll just clear the input
    setIdea("")
  }

  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Startup Idea Validator</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Get instant feedback on your startup idea using our AI-powered validator.</p>
        <form onSubmit={handleSubmit} className="flex gap-2">
          <Input
            type="text"
            placeholder="Enter your startup idea"
            value={idea}
            onChange={(e) => setIdea(e.target.value)}
            className="flex-grow"
          />
          <Button type="submit">Validate</Button>
        </form>
      </CardContent>
    </Card>
  )
}

