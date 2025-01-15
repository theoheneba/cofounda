import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2 } from 'lucide-react'

export function StartupIdeaGenerator() {
  const [industry, setIndustry] = useState("")
  const [problemStatement, setProblemStatement] = useState("")
  const [generatedIdea, setGeneratedIdea] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const generateIdea = async () => {
    setIsLoading(true)
    // In a real application, you would call your AI service here
    // For this example, we'll simulate an API call with a timeout
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratedIdea(`An AI-powered ${industry} platform that ${problemStatement} using machine learning algorithms and real-time data analysis.`)
    setIsLoading(false)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>AI Startup Idea Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
            <Input
              id="industry"
              placeholder="e.g., Healthcare, Fintech, Education"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="problem" className="block text-sm font-medium text-gray-700">Problem Statement</label>
            <Textarea
              id="problem"
              placeholder="Describe the problem you want to solve"
              value={problemStatement}
              onChange={(e) => setProblemStatement(e.target.value)}
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

