import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function SkillMatchingAlgorithm() {
  return (
    <Card className="mb-12">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">AI-Powered Skill Matching</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Our advanced AI algorithm matches you with potential co-founders based on complementary skills, shared interests, and startup goals.</p>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge>Machine Learning</Badge>
          <Badge>Natural Language Processing</Badge>
          <Badge>Personality Analysis</Badge>
          <Badge>Skill Compatibility</Badge>
        </div>
        <Link href="/skill-matching">
          <Button>Learn More About Our Matching Algorithm</Button>
        </Link>
      </CardContent>
    </Card>
  )
}

