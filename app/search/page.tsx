'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"

type User = {
  id: string
  name: string
  bio: string
  skills: string[]
  interests: string[]
  location: string
}

export default function SearchPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [skills, setSkills] = useState<string[]>([])
  const [interests, setInterests] = useState<string[]>([])
  const [users, setUsers] = useState<User[]>([])

  const handleSearch = async () => {
    const res = await fetch(`/api/search/users?query=${query}&skills=${skills.join(',')}&interests=${interests.join(',')}`)
    if (res.ok) {
      const data = await res.json()
      setUsers(data)
    }
  }

  useEffect(() => {
    handleSearch()
  }, [query, skills, interests])

  return (
    <div className="min-h-screen bg-[#FDF8F7] py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#4A2515] mb-6">Find Co-Founders</h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="mb-4">
            <Input
              type="text"
              placeholder="Search by name or bio"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-[#4A2515] mb-2">Filter by Skills</h3>
            <div className="flex flex-wrap gap-2">
              {["JavaScript", "React", "Node.js", "Python", "Machine Learning"].map((skill) => (
                <Button
                  key={skill}
                  onClick={() => setSkills(prev => prev.includes(skill) ? prev.filter(s => s !== skill) : [...prev, skill])}
                  variant={skills.includes(skill) ? "default" : "outline"}
                  className="text-sm"
                >
                  {skill}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-[#4A2515] mb-2">Filter by Interests</h3>
            <div className="flex flex-wrap gap-2">
              {["Web Development", "Mobile Apps", "AI", "Blockchain", "E-commerce"].map((interest) => (
                <Button
                  key={interest}
                  onClick={() => setInterests(prev => prev.includes(interest) ? prev.filter(i => i !== interest) : [...prev, interest])}
                  variant={interests.includes(interest) ? "default" : "outline"}
                  className="text-sm"
                >
                  {interest}
                </Button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          {users.map((user) => (
            <div key={user.id} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold text-[#4A2515] mb-2">{user.name}</h2>
              <p className="text-[#4A2515]/80 mb-4">{user.bio}</p>
              <div className="mb-4">
                <h3 className="font-semibold text-[#4A2515] mb-1">Skills:</h3>
                <div className="flex flex-wrap gap-2">
                  {user.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="font-semibold text-[#4A2515] mb-1">Interests:</h3>
                <div className="flex flex-wrap gap-2">
                  {user.interests.map((interest) => (
                    <span key={interest} className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              <p className="text-Here's the continuation from the cut-off point:

span>
                  ))}
                </div>
              </div>
              <p className="text-[#4A2515]/80 mb-4">Location: {user.location}</p>
              <Button asChild className="w-full bg-[#B85C3C] hover:bg-[#A34E32]">
                <Link href={`/profile/${user.id}`}>View Profile</Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

