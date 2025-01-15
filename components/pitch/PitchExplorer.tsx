"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Search, Filter, TrendingUp, Users, Target } from 'lucide-react'
import Link from "next/link"

type Pitch = {
  id: number
  title: string
  description: string
  industry: string
  stage: string
  location: string
  fundingGoal: string
  founder: {
    name: string
    avatar: string
    role: string
  }
  skills: string[]
  views: number
  matches: number
  createdAt: string
}

const mockPitches: Pitch[] = [
  {
    id: 1,
    title: "AI-Powered EdTech Platform",
    description: "Revolutionizing education with personalized AI-driven learning experiences",
    industry: "Education",
    stage: "Seed",
    location: "San Francisco, CA",
    fundingGoal: "$500,000",
    founder: {
      name: "Sarah Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Technical Founder"
    },
    skills: ["AI/ML", "EdTech", "Product Development"],
    views: 234,
    matches: 12,
    createdAt: "2024-01-10"
  },
  {
    id: 2,
    title: "Sustainable Fashion Marketplace",
    description: "Connecting eco-conscious consumers with sustainable fashion brands",
    industry: "Fashion",
    stage: "Pre-seed",
    location: "New York, NY",
    fundingGoal: "$250,000",
    founder: {
      name: "Michael Ross",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Business Developer"
    },
    skills: ["E-commerce", "Sustainability", "Marketing"],
    views: 156,
    matches: 8,
    createdAt: "2024-01-12"
  },
  {
    id: 3,
    title: "HealthTech IoT Solution",
    description: "Remote patient monitoring using IoT devices and predictive analytics",
    industry: "Healthcare",
    stage: "Series A",
    location: "Boston, MA",
    fundingGoal: "$2,000,000",
    founder: {
      name: "Dr. Emily Watson",
      avatar: "/placeholder.svg?height=40&width=40",
      role: "Healthcare Professional"
    },
    skills: ["Healthcare", "IoT", "Data Analytics"],
    views: 312,
    matches: 15,
    createdAt: "2024-01-08"
  }
]

const industries = ["All", "Education", "Healthcare", "Fashion", "Technology", "Finance"]
const stages = ["All", "Pre-seed", "Seed", "Series A", "Series B", "Growth"]
const sortOptions = ["Newest", "Most Viewed", "Most Matched"]

export function PitchExplorer() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedIndustry, setSelectedIndustry] = useState("All")
  const [selectedStage, setSelectedStage] = useState("All")
  const [sortBy, setSortBy] = useState("Newest")

  const filteredPitches = mockPitches.filter(pitch => {
    const matchesSearch = pitch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pitch.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesIndustry = selectedIndustry === "All" || pitch.industry === selectedIndustry
    const matchesStage = selectedStage === "All" || pitch.stage === selectedStage
    return matchesSearch && matchesIndustry && matchesStage
  })

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search pitches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
            <SelectTrigger className="w-[160px]">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Industry" />
            </SelectTrigger>
            <SelectContent>
              {industries.map((industry) => (
                <SelectItem key={industry} value={industry}>
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStage} onValueChange={setSelectedStage}>
            <SelectTrigger className="w-[160px]">
              <TrendingUp className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Stage" />
            </SelectTrigger>
            <SelectContent>
              {stages.map((stage) => (
                <SelectItem key={stage} value={stage}>
                  {stage}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[160px]">
              <Target className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-6">
        {filteredPitches.map((pitch) => (
          <Link href={`/pitch/${pitch.id}`} key={pitch.id}>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={pitch.founder.avatar} alt={pitch.founder.name} />
                        <AvatarFallback>{pitch.founder.name[0]}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{pitch.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          by {pitch.founder.name} • {pitch.founder.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{pitch.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {pitch.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <Badge variant="outline" className="mb-2">
                      {pitch.stage}
                    </Badge>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {pitch.views} views
                      </span>
                      <span className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {pitch.matches} matches
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-semibold">Funding Goal:</span> {pitch.fundingGoal}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {pitch.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredPitches.length === 0 && (
        <Card>
          <CardContent className="p-6 text-center">
            <p className="text-muted-foreground">No pitches found matching your criteria.</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

