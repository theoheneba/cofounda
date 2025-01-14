'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import Link from "next/link"

type UserProfile = {
  id: string
  name: string
  bio: string
  skills: string[]
  interests: string[]
  experience: string
  location: string
  linkedinUrl: string
  githubUrl: string
  projects: {
    id: string
    title: string
    description: string
    skills: string[]
  }[]
}

export default function UserProfilePage({ params }: { params: { id: string } }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    const fetchUserProfile = async () => {
      const res = await fetch(`/api/user/${params.id}`)
      if (res.ok) {
        const data = await res.json()
        setProfile(data)
      }
    }

    fetchUserProfile()
  }, [params.id])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-[#FDF8F7] py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-bold text-[#4A2515] mb-6">{profile.name}</h1>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-[#4A2515] mb-2">About</h2>
              <p className="text-[#4A2515]/80 mb-4">{profile.bio}</p>
              <h3 className="text-lg font-semibold text-[#4A2515] mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.skills.map((skill) => (
                  <span key={skill} className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded">
                    {skill}
                  </span>
                ))}
              </div>
              <h3 className="text-lg font-semibold text-[#4A2515] mb-2">Interests</h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {profile.interests.map((interest) => (
                  <span key={interest} className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-[#4A2515] mb-2">Experience</h2>
              <p className="text-[#4A2515]/80 mb-4">{profile.experience}</p>
              <h3 className="text-lg font-semibold text-[#4A2515] mb-2">Location</h3>
              <p className="text-[#4A2515]/80 mb-4">{profile.location}</p>
              <h3 className="text-lg font-semibold text-[#4A2515] mb-2">Links</h3>
              <div className="space-y-2">
                {profile.linkedinUrl && (
                  <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="text-[#B85C3C] hover:underline">
                    LinkedIn
                  </a>
                )}
                {profile.githubUrl && (
                  <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="text-[#B85C3C] hover:underline">
                    GitHub
                  </a>
                )}
              </div>
            </div>
          </div>
          <h2 className="text-2xl font-semibold text-[#4A2515] mt-8 mb-4">Projects</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {profile.projects.map((project) => (
              <div key={project.id} className="bg-[#FDF8F7] rounded-lg p-4">
                <h3 className="text-lg font-semibold text-[#4A2515] mb-2">{project.title}</h3>
                <p className="text-[#4A2515]/80 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.skills.map((skill) => (
                    <span key={skill} className="px-2 py-1 bg-white text-[#B85C3C] text-sm rounded">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          {session?.user?.id === params.id && (
            <div className="mt-8">
              <Button asChild className="bg-[#B85C3C] hover:bg-[#A34E32]">
                <Link href="/profile/edit">Edit Profile</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

