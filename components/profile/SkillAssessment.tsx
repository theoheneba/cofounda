import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"

export function SkillAssessment() {
  const [skills, setSkills] = useState([
    { name: 'Technical Skills', level: 85 },
    { name: 'Business Development', level: 70 },
    { name: 'Leadership', level: 90 },
    { name: 'Communication', level: 75 },
    { name: 'Problem Solving', level: 80 },
  ])

  const handleAssessment = () => {
    // Here you would typically initiate a skill assessment process
    // For now, we'll just randomize the skill levels
    setSkills(skills.map(skill => ({
      ...skill,
      level: Math.floor(Math.random() * 100) + 1
    })))
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Skill Assessment</CardTitle>
        <Button onClick={handleAssessment}>Start Assessment</Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {skills.map((skill) => (
            <div key={skill.name} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span>{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <Progress value={skill.level} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

