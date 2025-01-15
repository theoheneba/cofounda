"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

type Skill = string
type User = {
  id: number
  name: string
  skills: Skill[]
  avatar: string
  matchPercentage: number
}

export function SkillMatchingAlgorithm() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [inputSkill, setInputSkill] = useState("")
  const [matches, setMatches] = useState<User[]>([])

  const addSkill = () => {
    if (inputSkill && !skills.includes(inputSkill)) {
      setSkills([...skills, inputSkill])
      setInputSkill("")
    }
  }

  const removeSkill = (skillToRemove: Skill) => {
    setSkills(skills.filter(skill => skill !== skillToRemove))
  }

  const findMatches = () => {
    // In a real application, this would call an API to find matches
    // For this example, we'll generate some mock data
    const mockUsers: User[] = [
      { id: 1, name: "Alice Johnson", skills: ["React", "Node.js", "Python"], avatar: "/placeholder.svg?height=50&width=50", matchPercentage: 85 },
      { id: 2, name: "Bob Smith", skills: ["Vue", "Ruby", "DevOps"], avatar: "/placeholder.svg?height=50&width=50", matchPercentage: 70 },
      { id: 3, name: "Charlie Brown", skills: ["React", "Angular", "TypeScript"], avatar: "/placeholder.svg?height=50&width=50", matchPercentage: 60 },
    ]

    setMatches(mockUsers)
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Skill Matching Algorithm</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <div className="flex space-x-2 mb-2">
            <Input
              placeholder="Enter a skill"
              value={inputSkill}
              onChange={(e) => setInputSkill(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && addSkill()}
            />
            <Button onClick={addSkill}>Add Skill</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {skills.map(skill => (
              <Badge key={skill} variant="secondary" className="cursor-pointer" onClick={() => removeSkill(skill)}>
                {skill} ✕
              </Badge>
            ))}
          </div>
        </div>
        <Button onClick={findMatches} className="w-full mb-4">Find Matches</Button>
        <ScrollArea className="h-[300px]">
          {matches.map(user => (
            <div key={user.id} className="flex items-center space-x-4 mb-4 p-3 border rounded-md">
              <Avatar className="h-10 w-10">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h4 className="font-medium">{user.name}</h4>
                <div className="flex flex-wrap gap-1 mt-1">
                  {user.skills.map(skill => (
                    <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                  ))}
                </div>
              </div>
              <Badge className="bg-green-500">{user.matchPercentage}% Match</Badge>
            </div>
          ))}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

