import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const startups = [
  {
    name: "EcoTech Solutions",
    description: "Developing sustainable energy solutions for urban environments.",
    founders: [
      { name: "Alex Johnson", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Sarah Lee", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tags: ["CleanTech", "Sustainability"],
  },
  {
    name: "HealthAI",
    description: "AI-powered health diagnostics and personalized treatment plans.",
    founders: [
      { name: "Dr. Emily Chen", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "Michael Wong", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tags: ["HealthTech", "AI"],
  },
  {
    name: "FinLit",
    description: "Making financial literacy accessible through gamified learning.",
    founders: [
      { name: "Jessica Taylor", avatar: "/placeholder.svg?height=32&width=32" },
      { name: "David Rodriguez", avatar: "/placeholder.svg?height=32&width=32" },
    ],
    tags: ["FinTech", "EdTech"],
  },
]

export function FeaturedStartups() {
  return (
    <div className="grid md:grid-cols-3 gap-8">
      {startups.map((startup) => (
        <Card key={startup.name}>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
            <p className="text-[#6B5151] mb-4">{startup.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {startup.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#6B5151]">Co-founders:</span>
              <div className="flex -space-x-2">
                {startup.founders.map((founder) => (
                  <Avatar key={founder.name} className="h-8 w-8 border-2 border-white">
                    <AvatarImage src={founder.avatar} alt={founder.name} />
                    <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

