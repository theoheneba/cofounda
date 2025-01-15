import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FileText, Video, Book } from 'lucide-react'

type Resource = {
  id: number
  title: string
  type: 'document' | 'video' | 'book'
  category: string
  description: string
  url: string
}

export function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>([
    {
      id: 1,
      title: "How to Create a Compelling Pitch Deck",
      type: "document",
      category: "Fundraising",
      description: "A comprehensive guide to creating a pitch deck that will impress investors.",
      url: "#"
    },
    {
      id: 2,
      title: "Introduction to Lean Startup Methodology",
      type: "video",
      category: "Startup Basics",
      description: "Learn the principles of the Lean Startup methodology and how to apply them to your business.",
      url: "#"
    },
    {
      id: 3,
      title: "The Art of Startup Fundraising",
      type: "book",
      category: "Fundraising",
      description: "A comprehensive guide to raising capital for your startup.",
      url: "#"
    },
    {
      id: 4,
      title: "How to Conduct User Research",
      type: "document",
      category: "Product Development",
      description: "Learn effective techniques for conducting user research to inform your product development.",
      url: "#"
    },
    {
      id: 5,
      title: "Financial Modeling for Startups",
      type: "video",
      category: "Finance",
      description: "A step-by-step guide to creating financial models for your startup.",
      url: "#"
    }
  ])

  const [searchTerm, setSearchTerm] = useState("")

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5" />
      case 'video':
        return <Video className="h-5 w-5" />
      case 'book':
        return <Book className="h-5 w-5" />
      default:
        return <FileText className="h-5 w-5" />
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Resource Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 mb-4">
          <Input
            placeholder="Search resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button>Search</Button>
        </div>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {filteredResources.map((resource) => (
              <div key={resource.id} className="flex items-start space-x-4 p-4 border rounded-lg">
                <div className="mt-1">
                  {getIcon(resource.type)}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">{resource.description}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="secondary">{resource.category}</Badgemt-2">
                    <Badge variant="secondary">{resource.category}</Badge>
                    <Badge variant="outline">{resource.type}</Badge>
                  </div>
                </div>
                <Button variant="link" className="text-primary">
                  View Resource
                </Button>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

