'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type Skill = {
  id: string
  name: string
  level: number
  description: string
}

export function SkillAssessment() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [newSkill, setNewSkill] = useState({ name: '', level: 1, description: '' })

  useEffect(() => {
    fetchSkills()
  }, [])

  const fetchSkills = async () => {
    const res = await fetch('/api/skills')
    if (res.ok) {
      const data = await res.json()
      setSkills(data)
    }
  }

  const addSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newSkill.name.trim()) return

    const res = await fetch('/api/skills', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newSkill),
    })

    if (res.ok) {
      setNewSkill({ name: '', level: 1, description: '' })
      fetchSkills()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Skill Assessment</h2>
      <form onSubmit={addSkill} className="mb-4 space-y-4">
        <div>
          <Input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="Skill name..."
          />
        </div>
        <div>
          <Select
            value={newSkill.level.toString()}
            onValueChange={(value) => setNewSkill({ ...newSkill, level: parseInt(value) })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select skill level" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5].map((level) => (
                <SelectItem key={level} value={level.toString()}>
                  Level {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Textarea
            value={newSkill.description}
            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
            placeholder="Describe your experience with this skill..."
          />
        </div>
        <Button type="submit">Add Skill</Button>
      </form>
      <ul className="space-y-4">
        {skills.map((skill) => (
          <li key={skill.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <p className="text-sm text-gray-600">Level: {skill.level}/5</p>
            <p className="mt-2">{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

