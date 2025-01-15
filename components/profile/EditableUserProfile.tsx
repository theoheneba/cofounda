"use client"

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Camera, X } from 'lucide-react'
import { toast } from "@/components/ui/use-toast"

type User = {
  id: number
  name: string
  avatar: string
  bio: string
  skills: string[]
  location: string
  email: string
  website?: string
  linkedin?: string
  github?: string
  twitter?: string
  isVerified: boolean
  followers: number
  following: number
}

export function EditableUserProfile({ user, isOwnProfile }: { user: User; isOwnProfile: boolean }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedUser, setEditedUser] = useState(user)
  const [newSkill, setNewSkill] = useState("")
  const [isFollowing, setIsFollowing] = useState(false)

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setEditedUser({ ...editedUser, avatar: reader.result as string })
      }
      reader.readAsDataURL(file)
    }
  }

  const addSkill = () => {
    if (newSkill && !editedUser.skills.includes(newSkill)) {
      setEditedUser({
        ...editedUser,
        skills: [...editedUser.skills, newSkill]
      })
      setNewSkill("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setEditedUser({
      ...editedUser,
      skills: editedUser.skills.filter(skill => skill !== skillToRemove)
    })
  }

  const saveChanges = async () => {
    try {
      // Here you would typically send the updated profile to your backend
      // await updateProfile(editedUser)
      toast({
        title: "Profile updated",
        description: "Your changes have been saved successfully.",
      })
      setIsEditing(false)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      })
    }
  }

  const toggleFollow = () => {
    setIsFollowing(!isFollowing)
    toast({
      title: isFollowing ? "Unfollowed" : "Following",
      description: `You are ${isFollowing ? 'no longer following' : 'now following'} ${user.name}`,
    })
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Avatar className="h-24 w-24">
                <AvatarImage src={editedUser.avatar} alt={editedUser.name} />
                <AvatarFallback>{editedUser.name.charAt(0)}</AvatarFallback>
              </Avatar>
              {isEditing && (
                <Label
                  htmlFor="avatar-upload"
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-2 cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                  <Input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAvatarChange}
                  />
                </Label>
              )}
            </div>
            <div>
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={editedUser.name}
                    onChange={(e) => setEditedUser({ ...editedUser, name: e.target.value })}
                    className="font-semibold text-xl"
                  />
                  <Input
                    value={editedUser.location}
                    onChange={(e) => setEditedUser({ ...editedUser, location: e.target.value })}
                    placeholder="Location"
                  />
                </div>
              ) : (
                <>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    {editedUser.name}
                    {editedUser.isVerified && (
                      <Badge variant="secondary">Verified</Badge>
                    )}
                  </CardTitle>
                  <p className="text-muted-foreground">{editedUser.location}</p>
                </>
              )}
            </div>
          </div>
          {isOwnProfile ? (
            <div>
              {isEditing ? (
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setIsEditing(false)}>
                    Cancel
                  </Button>
                  <Button onClick={saveChanges}>
                    Save Changes
                  </Button>
                </div>
              ) : (
                <Button onClick={() => setIsEditing(true)}>
                  Edit Profile
                </Button>
              )}
            </div>
          ) : (
            <Button onClick={toggleFollow}>
              {isFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div>
            <h3 className="font-semibold mb-2">Bio</h3>
            {isEditing ? (
              <Textarea
                value={editedUser.bio}
                onChange={(e) => setEditedUser({ ...editedUser, bio: e.target.value })}
                placeholder="Tell us about yourself..."
                className="min-h-[100px]"
              />
            ) : (
              <p className="text-muted-foreground">{editedUser.bio}</p>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Skills</h3>
            <div className="flex flex-wrap gap-2">
              {editedUser.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="text-sm">
                  {skill}
                  {isEditing && (
                    <button
                      onClick={() => removeSkill(skill)}
                      className="ml-2 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </Badge>
              ))}
              {isEditing && (
                <div className="flex gap-2">
                  <Input
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="w-32"
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                  />
                  <Button onClick={addSkill} size="sm">
                    Add
                  </Button>
                </div>
              )}
            </div>
          </div>

          {isEditing && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  value={editedUser.website}
                  onChange={(e) => setEditedUser({ ...editedUser, website: e.target.value })}
                  placeholder="https://example.com"
                />
              </div>
              <div>
                <Label htmlFor="linkedin">LinkedIn</Label>
                <Input
                  id="linkedin"
                  value={editedUser.linkedin}
                  onChange={(e) => setEditedUser({ ...editedUser, linkedin: e.target.value })}
                  placeholder="LinkedIn profile URL"
                />
              </div>
              <div>
                <Label htmlFor="github">GitHub</Label>
                <Input
                  id="github"
                  value={editedUser.github}
                  onChange={(e) => setEditedUser({ ...editedUser, github: e.target.value })}
                  placeholder="GitHub profile URL"
                />
              </div>
              <div>
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={editedUser.twitter}
                  onChange={(e) => setEditedUser({ ...editedUser, twitter: e.target.value })}
                  placeholder="Twitter handle"
                />
              </div>
            </div>
          )}

          <div className="flex justify-between pt-4 border-t">
            <div className="text-center">
              <p className="text-2xl font-bold">{editedUser.followers}</p>
              <p className="text-sm text-muted-foreground">Followers</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold">{editedUser.following}</p>
              <p className="text-sm text-muted-foreground">Following</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

