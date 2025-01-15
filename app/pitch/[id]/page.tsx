import { notFound } from "next/navigation"
import { PitchDetails } from "@/components/pitch/PitchDetails"

// This is a mock function to fetch pitch data. In a real app, you'd fetch this from your API.
const getPitchData = (id: string) => {
  const mockPitch = {
    id: parseInt(id),
    title: "AI-Powered EdTech Platform",
    description: "Revolutionizing education with personalized AI-driven learning experiences",
    industry: "Education",
    stage: "Seed",
    location: "San Francisco, CA",
    fundingGoal: "$500,000",
    founder: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=128&width=128",
      role: "Technical Founder",
      bio: "Ex-Google engineer with 8 years of experience in AI/ML",
    },
    skills: ["AI/ML", "EdTech", "Product Development"],
    views: 234,
    matches: 12,
    createdAt: "2024-01-10",
    pitchDeck: [
      { title: "Problem", content: "Traditional education lacks personalization..." },
      { title: "Solution", content: "AI-driven adaptive learning platform..." },
      { title: "Market", content: "Global EdTech market size: $250B..." },
    ],
    team: [
      {
        name: "Sarah Chen",
        role: "CEO & Technical Lead",
        avatar: "/placeholder.svg?height=64&width=64",
      },
      {
        name: "David Kumar",
        role: "Head of AI",
        avatar: "/placeholder.svg?height=64&width=64",
      },
    ],
    traction: {
      users: 1000,
      growth: "30% MoM",
      revenue: "$50K ARR",
    }
  }

  return mockPitch
}

export default function PitchPage({ params }: { params: { id: string } }) {
  const pitch = getPitchData(params.id)

  if (!pitch) {
    notFound()
  }

  return (
    <div className="container mx-auto p-6 pt-24">
      <PitchDetails pitch={pitch} />
    </div>
  )
}

