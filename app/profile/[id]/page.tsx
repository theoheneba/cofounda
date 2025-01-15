import { EditableUserProfile } from "@/components/profile/EditableUserProfile"
import { StartupList } from "@/components/profile/StartupList"
import { auth } from "@/lib/auth" // You'll need to implement this

// This is a mock function to fetch user data. In a real app, you'd fetch this from your API.
const getUserData = (id: string) => {
  return {
    id: parseInt(id),
    name: "John Doe",
    avatar: "/placeholder.svg?height=128&width=128",
    bio: "Passionate entrepreneur and tech enthusiast",
    skills: ["React", "Node.js", "Product Management"],
    location: "San Francisco, CA",
    email: "john@example.com",
    website: "https://johndoe.com",
    linkedin: "https://linkedin.com/in/johndoe",
    github: "https://github.com/johndoe",
    twitter: "@johndoe",
    isVerified: true,
    followers: 1234,
    following: 567,
  }
}

// This is a mock function to fetch startup data. In a real app, you'd fetch this from your API.
const getStartups = (userId: string) => {
  return [
    { id: 1, name: "TechStart", description: "A B2B SaaS platform", status: "Current" as const },
    { id: 2, name: "GreenEnergy", description: "Renewable energy solutions", status: "Past" as const },
  ]
}

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const session = await auth()
  const user = getUserData(params.id)
  const startups = getStartups(params.id)
  const isOwnProfile = session?.user?.id === params.id

  return (
    <div className="container mx-auto p-6 space-y-6">
      <EditableUserProfile user={user} isOwnProfile={isOwnProfile} />
      <StartupList initialStartups={startups} isEditable={isOwnProfile} />
    </div>
  )
}

