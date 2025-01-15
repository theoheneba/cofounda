import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function SkillsAndExpertise() {
  const skills = [
    { name: 'Technical Skills', level: 85 },
    { name: 'Business Development', level: 70 },
    { name: 'Leadership', level: 90 },
    { name: 'Communication', level: 75 },
    { name: 'Problem Solving', level: 80 },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Expertise</CardTitle>
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

