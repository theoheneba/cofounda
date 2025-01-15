import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'

export function StartupIdeaGenerator() {
  const [industry, setIndustry] = useState('')
  const [problemStatement, setProblemStatement] = useState('')
  const [generatedIdea, setGeneratedIdea] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const generateIdea = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/generate-idea', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ industry, problemStatement })
      })
      if (!response.ok) throw new Error('Failed to generate idea')
      const data = await response.json()
      setGeneratedIdea(data.idea)
    } catch (error) {
      console.error('Error generating idea:', error)
      setGeneratedIdea('Failed to generate idea. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Startup Idea Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="industry">Industry</Label>
            <Input
              id="industry"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g., Healthcare, Fintech, Education"
            />
          </div>
          <div>
            <Label htmlFor="problem">Problem Statement</Label>
            <Input
              id="problem"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
              placeholder="Describe the problem you want to solve"
            />
          </div>
          <Button onClick={generateIdea} disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Idea...
              </>
            ) : (
              "Generate Startup Idea"
            )}
          </Button>
          {generatedIdea && (
            <div className="mt-4">
              <h3 className="text-lg font-semibold mb-2">Generated Idea:</h3>
              <p className="text-gray-700">{generatedIdea}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

