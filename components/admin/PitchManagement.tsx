"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Search } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

type Pitch = {
  id: string
  title: string
  founder: {
    name: string
  }
  industry: string
  stage: string
  status: string
}

export function PitchManagement() {
  const [pitches, setPitches] = useState<Pitch[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPitches = async () => {
      try {
        const response = await fetch('/api/admin/pitches')
        if (!response.ok) {
          throw new Error('Failed to fetch pitches')
        }
        const data = await response.json()
        setPitches(data)
      } catch (err) {
        setError('Failed to load pitches')
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchPitches()
  }, [])

  const filteredPitches = pitches.filter(pitch =>
    pitch.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pitch.founder.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    pitch.industry.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pitch Management</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search pitches..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-8"
            />
          </div>
          <Button>Add Pitch</Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Founder</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Stage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredPitches.map((pitch) => (
              <TableRow key={pitch.id}>
                <TableCell>{pitch.title}</TableCell>
                <TableCell>{pitch.founder.name}</TableCell>
                <TableCell>{pitch.industry}</TableCell>
                <TableCell>{pitch.stage}</TableCell>
                <TableCell>
                  <Badge
                    variant={pitch.status === "Active" ? "default" : pitch.status === "Pending" ? "secondary" : "outline"}
                  >
                    {pitch.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit pitch</DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">Delete pitch</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

