import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const resources = [
  { id: 1, title: "How to Create a Winning Pitch Deck", category: "Pitching" },
  { id: 2, title: "Understanding Startup Funding Rounds", category: "Funding" },
  { id: 3, title: "Building a Minimum Viable Product", category: "Product Development" },
]

export function ResourceHub() {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Resource Hub</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 mb-4">
          {resources.map((resource) => (
            <li key={resource.id} className="flex justify-between items-center">
              <span>{resource.title}</span>
              <span className="text-sm text-muted-foreground">{resource.category}</span>
            </li>
          ))}
        </ul>
        <Link href="/resources">
          <Button>Explore All Resources</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

