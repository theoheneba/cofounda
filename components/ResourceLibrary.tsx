'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type Resource = {
  id: string
  title: string
  description: string
  type: 'ARTICLE' | 'VIDEO' | 'TOOL'
  url: string
}

export function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>([])
  const [filter, setFilter] = useState<'ALL' | 'ARTICLE' | 'VIDEO' | 'TOOL'>('ALL')

  useEffect(() => {
    fetchResources()
  }, [])

  const fetchResources = async () => {
    const res = await fetch('/api/resources')
    if (res.ok) {
      const data = await res.json()
      setResources(data)
    }
  }

  const filteredResources = filter === 'ALL' 
    ? resources 
    : resources.filter(resource => resource.type === filter)

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Resource Library</h2>
      <div className="mb-4">
        <Button onClick={() => setFilter('ALL')} variant={filter === 'ALL' ? 'default' : 'outline'} className="mr-2">
          All
        </Button>
        <Button onClick={() => setFilter('ARTICLE')} variant={filter === 'ARTICLE' ? 'default' : 'outline'} className="mr-2">
          Articles
        </Button>
        <Button onClick={() => setFilter('VIDEO')} variant={filter === 'VIDEO' ? 'default' : 'outline'} className="mr-2">
          Videos
        </Button>
        <Button onClick={() => setFilter('TOOL')} variant={filter === 'TOOL' ? 'default' : 'outline'}>
          Tools
        </Button>
      </div>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <li key={resource.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{resource.title}</h3>
            <p className="mt-2">{resource.description}</p>
            <p className="text-sm text-gray-600 mt-2">Type: {resource.type}</p>
            <Button asChild className="mt-4">
              <Link href={resource.url} target="_blank" rel="noopener noreferrer">View Resource</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

