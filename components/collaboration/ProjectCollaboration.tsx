import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CheckCircle, Clock, AlertCircle } from 'lucide-react'

type Task = {
  id: number
  title: string
  description: string
  status: 'todo' | 'in-progress' | 'done'
  assignee: string
}

type Milestone = {
  id: number
  title: string
  dueDate: string
  status: 'upcoming' | 'in-progress' | 'completed'
}

type Document = {
  id: number
  title: string
  type: string
  lastModified: string
}

export function ProjectCollaboration() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "Create project plan", description: "Outline the project scope and timeline", status: "done", assignee: "John" },
    { id: 2, title: "Design user interface", description: "Create wireframes and mockups", status: "in-progress", assignee: "Emma" },
    { id: 3, title: "Develop backend API", description: "Implement RESTful API endpoints", status: "todo", assignee: "Michael" },
  ])

  const [milestones, setMilestones] = useState<Milestone[]>([
    { id: 1, title: "Project Kickoff", dueDate: "2023-07-01", status: "completed" },
    { id: 2, title: "MVP Release", dueDate: "2023-08-15", status: "in-progress" },
    { id: 3, title: "Beta Testing", dueDate: "2023-09-30", status: "upcoming" },
  ])

  const [documents, setDocuments] = useState<Document[]>([
    { id: 1, title: "Project Proposal", type: "PDF", lastModified: "2023-06-10" },
    { id: 2, title: "Technical Specifications", type: "DOCX", lastModified: "2023-06-15" },
    { id: 3, title: "User Research Results", type: "XLSX", lastModified: "2023-06-20" },
  ])

  const [newTask, setNewTask] = useState({ title: "", description: "", assignee: "" })

  const addTask = () => {
    if (newTask.title.trim() === "") return
    const task: Task = {
      id: tasks.length + 1,
      title: newTask.title,
      description: newTask.description,
      status: "todo",
      assignee: newTask.assignee
    }
    setTasks([...tasks, task])
    setNewTask({ title: "", description: "", assignee: "" })
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done':
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'in-progress':
        return <Clock className="h-4 w-4 text-yellow-500" />
      default:
        return <AlertCircle className="h-4 w-4 text-gray-500" />
    }
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Project Collaboration</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tasks">
          <TabsList className="mb-4">
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="milestones">Milestones</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>
          <TabsContent value="tasks">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Input
                  placeholder="Task title"
                  value={newTask.title}
                  onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                />
                <Input
                  placeholder="Assignee"
                  value={newTask.assignee}
                  onChange={(e) => setNewTask({ ...newTask, assignee: e.target.value })}
                />
                <Button onClick={addTask}>Add Task</Button>
              </div>
              <Textarea
                placeholder="Task description"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              />
              <ScrollArea className="h-[300px]">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-2 border-b">
                    <div>
                      <h4 className="font-semibold">{task.title}</h4>
                      <p className="text-sm text-muted-foreground">{task.description}</p>
                      <p className="text-xs text-muted-foreground">Assignee: {task.assignee}</p>
                    </div>
                    <div className="flex items-center">
                      {getStatusIcon(task.status)}
                      <Badge className="ml-2">{task.status}</Badge>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="milestones">
            <ScrollArea className="h-[300px]">
              {milestones.map((milestone) => (
                <div key={milestone.id} className="flex items-center justify-between p-2 border-b">
                  <div>
                    <h4 className="font-semibold">{milestone.title}</h4>
                    <p className="text-sm text-muted-foreground">Due: {milestone.dueDate}</p>
                  </div>
                  <div className="flex items-center">
                    {getStatusIcon(milestone.status)}
                    <Badge className="ml-2">{milestone.status}</Badge>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
          <TabsContent value="documents">
            <ScrollArea className="h-[300px]">
              {documents.map((document) => (
                <div key={document.id} className="flex items-center justify-between p-2 border-b">
                  <div>
                    <h4 className="font-semibold">{document.title}</h4>
                    <p className="text-sm text-muted-foreground">Type: {document.type}</p>
                    <p className="text-xs text-muted-foreground">Last modified: {document.lastModified}</p>
                  </div>
                  <Button variant="outline">View</Button>
                </div>
              ))}I'll continue the text stream from the cut-off point:

variant="outline">View</Button>
                </div>
              ))}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}

