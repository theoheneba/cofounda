'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export function StartupIdeaGenerator() {
  const [industry, setIndustry] = useState('')
  const [idea, setIdea] = useState('')
  const [loading, setLoading] = useState(false)

  const generateIdea = async () => {
    setLoading(true)
    try {
      const res = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry }),
      })
      if (res.ok) {
        const data = await res.json()
        setIdea(data.idea)
      }
    } catch (error) {
      console.error('Failed to generate idea:', error)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Startup Idea Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Enter an industry (e.g., healthcare, education)"
            value={industry}
            onChange={(e) => setIndustry(e.target.value)}
          />
          <Button onClick={generateIdea} disabled={loading || !industry}>
            {loading ? 'Generating...' : 'Generate Idea'}
          </Button>
          {idea && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold">Your Startup Idea:</h3>
              <p>{idea}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

