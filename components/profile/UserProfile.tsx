"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Camera } from 'lucide-react'

type User = {
  id: number
  name: string
  avatar: string
  bio: string
  skills: string[]
  isVerified: boolean
  followers: number
  following: number
}

export function UserProfile({ user, isOwnProfile }: { user: User; isOwnProfile: boolean }) {
  const [isFollowing, setIsFollowing] = useState(false)
  const [avatar, setAvatar] = useState(user.avatar)

  const toggleFollow = () => {
    // Here you would typically send a request to your backend to follow/unfollow
    setIsFollowing(!isFollowing)
  }

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-20 w-20">
              <AvatarImage src={avatar} alt={user.name} />
              <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            {isOwnProfile && (
              <Label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1 cursor-pointer">
                <Camera className="h-4 w-4" />
                <Input id="avatar-upload" type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />
              </Label>
            )}
          </div>
          <div>
            <CardTitle className="text-2xl">
              {user.name}
              {user.isVerified && (
                <Badge variant="secondary" className="ml-2">Verified</Badge>
              )}
            </CardTitle>
            <p className="text-muted-foreground">{user.bio}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <div className="text-center">
            <p className="text-2xl font-bold">{user.followers}</p>
            <p className="text-sm text-muted-foreground">Followers</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">{user.following}</p>
            <p className="text-sm text-muted-foreground">Following</p>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {user.skills.map((skill, index) => (
              <Badge key={index} variant="outline">{skill}</Badge>
            ))}
          </div>
        </div>
        {!isOwnProfile && (
          <Button onClick={toggleFollow} className="w-full">
            {isFollowing ? "Unfollow" : "Follow"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

