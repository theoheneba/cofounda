"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Edit, Trash } from 'lucide-react'

type Startup = {
  id: number
  name: string
  description: string
  status: 'Past' | 'Current'
}

export function StartupList({ initialStartups, isEditable }: { initialStartups: Startup[], isEditable: boolean }) {
  const [startups, setStartups] = useState<Startup[]>(initialStartups)
  const [isAdding, setIsAdding] = useState(false)
  const [newStartup, setNewStartup] = useState<Omit<Startup, 'id'>>({ name: '', description: '', status: 'Current' })

  const addStartup = () => {
    if (newStartup.name && newStartup.description) {
      setStartups([...startups, { ...newStartup, id: Date.now() }])
      setNewStartup({ name: '', description: '', status: 'Current' })
      setIsAdding(false)
    }
  }

  const deleteStartup = (id: number) => {
    setStartups(startups.filter(startup => startup.id !== id))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Startups</CardTitle>
      </CardHeader>
      <CardContent>
        {startups.map((startup) => (
          <div key={startup.id} className="mb-4 p-4 border rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold">{startup.name}</h4>
                <p className="text-sm text-muted-foreground">{startup.description}</p>
              </div>
              <Badge>{startup.status}</Badge>
            </div>
            {isEditable && (
              <div className="mt-2 flex justify-end space-x-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" /> Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => deleteStartup(startup.id)}>
                  <Trash className="h-4 w-4 mr-1" /> Delete
                </Button>
              </div>
            )}
          </div>
        ))}
        {isEditable && (
          isAdding ? (
            <div className="mt-4 p-4 border rounded-lg">
              <Label htmlFor="startup-name">Startup Name</Label>
              <Input
                id="startup-name"
                value={newStartup.name}
                onChange={(e) => setNewStartup({ ...newStartup, name: e.target.value })}
                className="mb-2"
              />
              <Label htmlFor="startup-description">Description</Label>
              <Textarea
                id="startup-description"
                value={newStartup.description}
                onChange={(e) => setNewStartup({ ...newStartup, description: e.target.value })}
                className="mb-2"
              />
              <Label htmlFor="startup-status">Status</Label>
              <select
                id="startup-status"
                value={newStartup.status}
                onChange={(e) => setNewStartup({ ...newStartup, status: e.target.value as 'Past' | 'Current' })}
                className="w-full p-2 border rounded mb-2"
              >
                <option value="Current">Current</option>
                <option value="Past">Past</option>
              </select>
              <div className="flex justify-end space-x-2">
                <Button onClick={() => setIsAdding(false)} variant="outline">Cancel</Button>
                <Button onClick={addStartup}>Add Startup</Button>
              </div>
            </div>
          ) : (
            <Button onClick={() => setIsAdding(true)} className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" /> Add Startup
            </Button>
          )
        )}
      </CardContent>
    </Card>
  )
}

