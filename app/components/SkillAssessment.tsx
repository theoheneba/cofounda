'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

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
      <form onSubmit={addSkill} className="mb-4">
        <div className="space-y-2">
          <Input
            type="text"
            value={newSkill.name}
            onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
            placeholder="Skill name..."
          />
          <Input
            type="number"
            min="1"
            max="5"
            value={newSkill.level}
            onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
            placeholder="Skill level (1-5)..."
          />
          <Textarea
            value={newSkill.description}
            onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
            placeholder="Describe your experience with this skill..."
          />
          <Button type="submit">Add Skill</Button>
        </div>
      </form>
      <ul>
        {skills.map((skill) => (
          <li key={skill.id} className="mb-4">
            <h3 className="text-lg font-semibold">{skill.name}</h3>
            <p>Level: {skill.level}/5</p>
            <p>{skill.description}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

