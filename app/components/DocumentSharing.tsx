'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Document = {
  id: string
  title: string
  url: string
}

export function DocumentSharing({ projectId }: { projectId: string }) {
  const [documents, setDocuments] = useState<Document[]>([])
  const [newDocumentTitle, setNewDocumentTitle] = useState('')
  const [newDocumentUrl, setNewDocumentUrl] = useState('')

  useEffect(() => {
    fetchDocuments()
  }, [projectId])

  const fetchDocuments = async () => {
    const res = await fetch(`/api/projects/${projectId}/documents`)
    if (res.ok) {
      const data = await res.json()
      setDocuments(data)
    }
  }

  const addDocument = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDocumentTitle.trim() || !newDocumentUrl.trim()) return

    const res = await fetch(`/api/projects/${projectId}/documents`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newDocumentTitle, url: newDocumentUrl }),
    })

    if (res.ok) {
      setNewDocumentTitle('')
      setNewDocumentUrl('')
      fetchDocuments()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Shared Documents</h2>
      <form onSubmit={addDocument} className="mb-4">
        <div className="flex items-center space-x-2">
          <Input
            type="text"
            value={newDocumentTitle}
            onChange={(e) => setNewDocumentTitle(e.target.value)}
            placeholder="Document title..."
            className="flex-grow"
          />
          <Input
            type="url"
            value={newDocumentUrl}
            onChange={(e) => setNewDocumentUrl(e.target.value)}
            placeholder="Document URL..."
            className="flex-grow"
          />
          <Button type="submit">Add Document</Button>
        </div>
      </form>
      <ul>
        {documents.map((document) => (
          <li key={document.id} className="mb-2">
            <a href={document.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
              {document.title}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

