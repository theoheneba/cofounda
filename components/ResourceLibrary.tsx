"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Book, FileText, Video } from 'lucide-react'

export function ResourceLibrary() {
  const resources = [
    {
      id: 1,
      title: 'Startup Financial Planning Guide',
      type: 'document',
      category: 'Finance',
    },
    {
      id: 2,
      title: 'Product Development Best Practices',
      type: 'video',
      category: 'Development',
    },
    {
      id: 3,
      title: 'Marketing Strategy Handbook',
      type: 'book',
      category: 'Marketing',
    },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'document':
        return <FileText className="h-4 w-4" />
      case 'video':
        return <Video className="h-4 w-4" />
      case 'book':
        return <Book className="h-4 w-4" />
      default:
        return <FileText className="h-4 w-4" />
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Library</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {resources.map((resource) => (
            <div
              key={resource.id}
              className="flex items-center p-2 rounded-md hover:bg-accent cursor-pointer"
            >
              {getIcon(resource.type)}
              <div className="ml-3">
                <p className="text-sm font-medium">{resource.title}</p>
                <p className="text-xs text-muted-foreground">{resource.category}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

