"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Upload } from 'lucide-react'

export function DocumentSharing() {
  const documents = [
    { id: 1, name: 'Business Plan.pdf', date: '2024-01-15' },
    { id: 2, name: 'Financial Projections.xlsx', date: '2024-01-14' },
    { id: 3, name: 'Marketing Strategy.docx', date: '2024-01-13' },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <Button className="w-full mb-4">
          <Upload className="mr-2 h-4 w-4" />
          Upload Document
        </Button>
        <div className="space-y-2">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-2 rounded-md hover:bg-accent"
            >
              <div className="flex items-center">
                <FileText className="h-4 w-4 mr-2 text-blue-500" />
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-muted-foreground">{doc.date}</p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                Download
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

