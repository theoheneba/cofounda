"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Users, Target, TrendingUp, Calendar } from 'lucide-react'

type PitchDetailsProps = {
  pitch: {
    id: number
    title: string
    description: string
    industry: string
    stage: string
    location: string
    fundingGoal: string
    founder: {
      name: string
      avatar: string
      role: string
      bio: string
    }
    skills: string[]
    views: number
    matches: number
    createdAt: string
    pitchDeck: Array<{ title: string; content: string }>
    team: Array<{ name: string; role: string; avatar: string }>
    traction: {
      users: number
      growth: string
      revenue: string
    }
  }
}

export function PitchDetails({ pitch }: PitchDetailsProps) {
  const [showContactDialog, setShowContactDialog] = useState(false)

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={pitch.founder.avatar} alt={pitch.founder.name} />
                  <AvatarFallback>{pitch.founder.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-bold">{pitch.title}</h1>
                  <p className="text-muted-foreground">
                    by {pitch.founder.name} • {pitch.founder.role}
                  </p>
                </div>
              </div>
              <p className="text-lg">{pitch.description}</p>
              <div className="flex flex-wrap gap-2">
                {pitch.skills.map((skill) => (
                  <Badge key={skill} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <Dialog open={showContactDialog} onOpenChange={setShowContactDialog}>
                <DialogTrigger asChild>
                  <Button size="lg" className="w-full md:w-auto">
                    Connect with Founder
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Connect with {pitch.founder.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                    <p>
                      To connect with this founder, please create an account or sign in.
                      Once connected, you can discuss potential collaboration opportunities.
                    </p>
                    <Button className="w-full" onClick={() => setShowContactDialog(false)}>
                      Sign Up to Connect
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
              <div className="flex flex-col gap-2">
                <Badge variant="outline" className="w-fit">
                  {pitch.stage}
                </Badge>
                <div className="text-sm">
                  <span className="font-semibold">Funding Goal:</span> {pitch.fundingGoal}
                </div>
                <div className="text-sm text-muted-foreground">
                  {pitch.location}
                </div>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  {pitch.views} views
                </span>
                <span className="flex items-center">
                  <Target className="w-4 h-4 mr-1" />
                  {pitch.matches} matches
                </span>
                <span className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  {new Date(pitch.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="pitch-deck">
        <TabsList>
          <TabsTrigger value="pitch-deck">Pitch Deck</TabsTrigger>
          <TabsTrigger value="team">Team</TabsTrigger>
          <TabsTrigger value="traction">Traction</TabsTrigger>
        </TabsList>
        <TabsContent value="pitch-deck">
          <Card>
            <CardContent className="p-6 space-y-6">
              {pitch.pitchDeck.map((slide, index) => (
                <div key={index} className="space-y-2">
                  <h3 className="text-xl font-semibold">{slide.title}</h3>
                  <p className="text-muted-foreground">{slide.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-2">
                {pitch.team.map((member) => (
                  <div key={member.name} className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback>{member.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold">{member.name}</h3>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="traction">
          <Card>
            <CardContent className="p-6">
              <div className="grid gap-6 md:grid-cols-3">
                <div>
                  <h3 className="font-semibold">Users</h3>
                  <p className="text-2xl">{pitch.traction.users.toLocaleString()}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Growth</h3>
                  <p className="text-2xl">{pitch.traction.growth}</p>
                </div>
                <div>
                  <h3 className="font-semibold">Revenue</h3>
                  <p className="text-2xl">{pitch.traction.revenue}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

