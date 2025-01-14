'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function EditProfilePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [userData, setUserData] = useState({
    name: "",
    bio: "",
    skills: [] as string[],
    interests: [] as string[],
    experience: "",
    location: "",
    linkedinUrl: "",
    githubUrl: "",
  })
  const [skillInput, setSkillInput] = useState("")
  const [interestInput, setInterestInput] = useState("")

  useEffect(() => {
    const fetchUserData = async () => {
      const res = await fetch(`/api/user/${session?.user?.id}`)
      if (res.ok) {
        const data = await res.json()
        setUserData(data)
      }
    }

    if (session?.user?.id) {
      fetchUserData()
    }
  }, [session])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setUserData({ ...userData, [e.target.name]: e.target.value })
  }

  const addSkill = () => {
    if (skillInput && !userData.skills.includes(skillInput)) {
      setUserData({ ...userData, skills: [...userData.skills, skillInput] })
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setUserData({ ...userData, skills: userData.skills.filter(skill => skill !== skillToRemove) })
  }

  const addInterest = () => {
    if (interestInput && !userData.interests.includes(interestInput)) {
      setUserData({ ...userData, interests: [...userData.interests, interestInput] })
      setInterestInput("")
    }
  }

  const removeInterest = (interestToRemove: string) => {
    setUserData({ ...userData, interests: userData.interests.filter(interest => interest !== interestToRemove) })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch("/api/user/profile", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })

    if (res.ok) {
      router.push("/profile")
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF8F7] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-[#4A2515] mb-6">Edit Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={userData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="bio">Bio</Label>
              <Textarea
                id="bio"
                name="bio"
                value={userData.bio}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="skills">Skills</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="skills"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  placeholder="Add a skill"
                />
                <Button type="button" onClick={addSkill} variant="secondary">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded flex items-center gap-1"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() => removeSkill(skill)}
                      className="text-[#B85C3C] hover:text-[#A34E32]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="interests">Interests</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  id="interests"
                  value={interestInput}
                  onChange={(e) => setInterestInput(e.target.value)}
                  placeholder="Add an interest"
                />
                <Button type="button" onClick={addInterest} variant="secondary">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {userData.interests.map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-1 bg-[#FDF8F7] text-[#B85C3C] text-sm rounded flex items-center gap-1"
                  >
                    {interest}
                    <button
                      type="button"
                      onClick={() => removeInterest(interest)}
                      className="text-[#B85C3C] hover:text-[#A34E32]"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Textarea
                id="experience"
                name="experience"
                value={userData.experience}
                onChange={handleInputChange}
                rows={4}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={userData.location}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
              <Input
                id="linkedinUrl"
                name="linkedinUrl"
                value={userData.linkedinUrl}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="githubUrl">GitHub URL</Label>
              <Input
                id="githubUrl"
                name="githubUrl"
                value={userData.githubUrl}
                onChange={handleInputChange}
              />
            </div>
            <Button type="submit" className="w-full bg-[#B85C3C] hover:bg-[#A34E32]">
              Save Changes
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

