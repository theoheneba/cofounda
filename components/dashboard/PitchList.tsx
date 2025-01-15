import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from 'lucide-react'

export function PitchList() {
  const pitches = [
    {
      id: 1,
      title: "AI-Powered EdTech Platform",
      description: "Looking for a technical co-founder to build an adaptive learning platform using AI/ML.",
      category: "Technology",
      skills: ["Machine Learning", "React", "Node.js"],
      stage: "Idea",
      location: "Remote",
      views: 156,
      matches: 12,
    },
    {
      id: 2,
      title: "Healthcare Management System",
      description: "Seeking healthcare professional with technical background to revolutionize patient care.",
      category: "Healthcare",
      skills: ["Healthcare", "Project Management", "UI/UX"],
      stage: "MVP",
      location: "United States",
      views: 98,
      matches: 8,
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Your Pitches</CardTitle>
        <Button className="bg-[#E27D60] hover:bg-[#c66a51]">
          <PlusCircle className="h-4 w-4 mr-2" />
          New Pitch
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {pitches.map((pitch) => (
            <div key={pitch.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="font-semibold text-lg">{pitch.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{pitch.description}</p>
                </div>
                <Badge variant="secondary">{pitch.stage}</Badge>
              </div>
              <div className="flex flex-wrap gap-2 mb-3">
                {pitch.skills.map((skill) => (
                  <Badge key={skill} variant="outline">{skill}</Badge>
                ))}
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span>{pitch.category}</span>
                  <span>{pitch.location}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span>{pitch.views} views</span>
                  <span>{pitch.matches} matches</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

