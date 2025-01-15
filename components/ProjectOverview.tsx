import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function ProjectOverview() {
  const project = {
    name: "CoFounderHub",
    description: "A platform connecting entrepreneurs with potential co-founders",
    progress: 65,
    milestones: [
      { id: 1, name: "MVP Development", status: "In Progress" },
      { id: 2, name: "User Testing", status: "Planned" },
      { id: 3, name: "Marketing Strategy", status: "Completed" },
    ]
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{project.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Project Progress</span>
            <span>{project.progress}%</span>
          </div>
          <Progress value={project.progress} className="w-full" />
        </div>
        <div className="mt-4">
          <h4 className="text-sm font-medium mb-2">Key Milestones</h4>
          <ul className="space-y-2">
            {project.milestones.map((milestone) => (
              <li key={milestone.id} className="flex justify-between text-sm">
                <span>{milestone.name}</span>
                <span className={
                  milestone.status === "Completed" ? "text-green-600" :
                  milestone.status === "In Progress" ? "text-yellow-600" :
                  "text-blue-600"
                }>
                  {milestone.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

