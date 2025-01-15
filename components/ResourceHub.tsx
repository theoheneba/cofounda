import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { FileIcon, VideoIcon, BookIcon } from 'lucide-react'

type Resource = {
  id: string
  title: string
  description: string
  type: 'article' | 'video' | 'ebook'
  category: string
  url: string
}

type ResourceHubProps = {
  resources: Resource[]
}

export function ResourceHub({ resources }: ResourceHubProps) {
  const getIcon = (type: Resource['type']) => {
    switch (type) {
      case 'article':
        return <FileIcon className="h-6 w-6" />
      case 'video':
        return <VideoIcon className="h-6 w-6" />
      case 'ebook':
        return <BookIcon className="h-6 w-6" />
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {resources.map((resource) => (
        <Card key={resource.id}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getIcon(resource.type)}
              {resource.title}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{resource.description}</p>
            <div className="flex items-center justify-between mb-4">
              <Badge>{resource.category}</Badge>
              <Badge variant="outline">{resource.type}</Badge>
            </div>
            <Button className="w-full" asChild>
              <a href={resource.url} target="_blank" rel="noopener noreferrer">Access Resource</a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

