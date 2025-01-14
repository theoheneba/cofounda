'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

type Milestone = {
  id: string
  title: string
  dueDate: string
  completed: boolean
}

export function Milestones({ projectId }: { projectId: string }) {
  const [milestones, setMilestones] = useState<Milestone[]>([])
  const [newMilestone, setNewMilestone] = useState('')
  const [dueDate, setDueDate] = useState<Date>()

  useEffect(() => {
    fetchMilestones()
  }, [projectId])

  const fetchMilestones = async () => {
    const res = await fetch(`/api/projects/${projectId}/milestones`)
    if (res.ok) {
      const data = await res.json()
      setMilestones(data)
    }
  }

  const addMilestone = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMilestone.trim() || !dueDate) return

    const res = await fetch(`/api/projects/${projectId}/milestones`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newMilestone, dueDate }),
    })

    if (res.ok) {
      setNewMilestone('')
      setDueDate(undefined)
      fetchMilestones()
    }
  }

  const toggleMilestone = async (id: string, completed: boolean) => {
    const res = await fetch(`/api/projects/${projectId}/milestones/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed }),
    })

    if (res.ok) {
      fetchMilestones()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Milestones</h2>
      <form onSubmit={addMilestone} className="mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
            placeholder="New milestone..."
            className="flex-grow"
          />
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline">
                {dueDate ? format(dueDate, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={dueDate}
                onSelect={setDueDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button type="submit">Add Milestone</Button>
        </div>
      </form>
      <ul>
        {milestones.map((milestone) => (
          <li key={milestone.id} className="flex items-center justify-between mb-2">
            <div>
              <input
                type="checkbox"
                checked={milestone.completed}
                onChange={(e) => toggleMilestone(milestone.id, e.target.checked)}
                className="mr-2"
              />
              <span className={milestone.completed ? 'line-through' : ''}>
                {milestone.title}
              </span>
            </div>
            <span>{format(new Date(milestone.dueDate), "PPP")}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

