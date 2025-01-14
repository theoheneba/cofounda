'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type User = {
  id: string
  name: string
  email: string
  role: string
  createdAt: string
}

type Project = {
  id: string
  title: string
  description: string
  user: {
    name: string
  }
  createdAt: string
}

export default function AdminPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    const fetchAdminData = async () => {
      const res = await fetch("/api/admin")
      if (res.ok) {
        const data = await res.json()
        setUsers(data.users)
        setProjects(data.projects)
      }
    }

    if (session?.user?.role === "ADMIN") {
      fetchAdminData()
    } else {
      router.push("/")
    }
  }, [session, router])

  const handleUserAction = async (userId: string, action: string) => {
    const res = await fetch("/api/admin", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, action }),
    })

    if (res.ok) {
      // Refresh the user list
      const updatedUsers = users.map(user => {
        if (user.id === userId) {
          if (action === "promoteToAdmin") {
            return { ...user, role: "ADMIN" }
          } else if (action === "demoteToUser") {
            return { ...user, role: "USER" }
          }
        }
        return user
      })

      if (action === "deleteUser") {
        setUsers(users.filter(user => user.id !== userId))
      } else {
        setUsers(updatedUsers)
      }
    }
  }

  if (session?.user?.role !== "ADMIN") {
    return null
  }

  return (
    <div className="min-h-screen bg-[#FDF8F7] py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#4A2515] mb-6">Admin Panel</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-[#4A2515] mb-4">Users</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {user.role === "USER" ? (
                      <Button onClick={() => handleUserAction(user.id, "promoteToAdmin")} className="mr-2">
                        Promote to Admin
                      </Button>
                    ) : (
                      <Button onClick={() => handleUserAction(user.id, "demoteToUser")} className="mr-2">
                        Demote to User
                      </Button>
                    )}
                    <Button onClick={() => handleUserAction(user.id, "deleteUser")} variant="destructive">
                      Delete User
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-[#4A2515] mb-4">Projects</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Created By</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project.id}>
                  <TableCell>{project.title}</TableCell>
                  <TableCell>{project.description}</TableCell>
                  <TableCell>{project.user.name}</TableCell>
                  <TableCell>{new Date(project.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}

