import { NextResponse } from 'next/server'

export async function GET() {
  // This is a mock implementation. In a real application, you would fetch this data from a database.
  const recentStartups = [
    {
      id: "1",
      name: "EcoTech Solutions",
      description: "Developing sustainable energy solutions for urban environments",
      founderName: "Emma Green",
      founderAvatar: "/avatars/emma-green.jpg",
      tags: ["CleanTech", "Sustainability", "Energy"]
    },
    {
      id: "2",
      name: "HealthAI",
      description: "AI-powered health diagnostics and personalized treatment plans",
      founderName: "Dr. James Wilson",
      founderAvatar: "/avatars/james-wilson.jpg",
      tags: ["HealthTech", "AI", "MedTech"]
    },
    {
      id: "3",
      name: "FinLit",
      description: "Financial literacy education platform for young adults",
      founderName: "Sophia Chen",
      founderAvatar: "/avatars/sophia-chen.jpg",
      tags: ["FinTech", "Education", "Personal Finance"]
    }
  ]

  return NextResponse.json(recentStartups)
}

