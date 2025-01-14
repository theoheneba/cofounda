import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RocketIcon, ShieldCheckIcon, MessageSquareIcon, FileIcon, Users, Lightbulb, TrendingUp } from 'lucide-react'
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel"
import { StatsCounter } from "@/components/StatsCounter"
import { FeaturedPitch } from "@/components/FeaturedPitch"
import { UpcomingEvents } from "@/components/UpcomingEvents"
import { MentorSpotlight } from "@/components/MentorSpotlight"

async function getRecentStartups() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recent-startups`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch recent startups')
  return res.json()
}

async function getRecentProjects() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recent-projects`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch recent projects')
  return res.json()
}

async function getRecentUsers() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/recent-users`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch recent users')
  return res.json()
}

async function getFeaturedPitch() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-pitch`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch featured pitch')
  return res.json()
}

async function getUpcomingEvents() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/upcoming-events`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch upcoming events')
  return res.json()
}

async function getFeaturedMentor() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/featured-mentor`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch featured mentor')
  return res.json()
}

export default async function Home() {
  const [recentStartups, recentProjects, recentUsers, featuredPitch, upcomingEvents, featuredMentor] = await Promise.all([
    getRecentStartups(),
    getRecentProjects(),
    getRecentUsers(),
    getFeaturedPitch(),
    getUpcomingEvents(),
    getFeaturedMentor(),
  ])

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="pt-32 pb-16 bg-gradient-to-b from-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 text-foreground">
              Find Your Perfect{" "}
              <span className="text-primary">Co-Founder</span>
            </h1>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Connect with passionate entrepreneurs and professionals who share
              your vision and complement your skills. Build something amazing
              together.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
              >
                <RocketIcon className="mr-2 h-4 w-4" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20 bg-secondary/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
              Why Choose CoFounderHub?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                  <p className="text-muted-foreground">Our AI-powered algorithm finds the perfect co-founder based on skills, experience, and goals.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Lightbulb className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Idea Validation</h3>
                  <p className="text-muted-foreground">Get feedback on your startup ideas from experienced entrepreneurs and mentors.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <TrendingUp className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Growth Resources</h3>
                  <p className="text-muted-foreground">Access a wealth of resources, workshops, and tools to help your startup succeed.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#FDF8F7]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#4A3333]">
              Featured Startups
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {recentStartups.map((startup) => (
                <Card key={startup.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="h-40 bg-gradient-to-r from-blue-400 to-purple-500" />
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{startup.name}</h3>
                      <p className="text-[#6B5151] mb-4 line-clamp-2">{startup.description}</p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {startup.tags.map((tag) => (
                          <Badge key={tag} variant="secondary">{tag}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-[#6B5151]">Co-founders:</span>
                          <div className="flex -space-x-2">
                            {startup.founders.map((founder) => (
                              <Avatar key={founder.id} className="h-8 w-8 border-2 border-white">
                                <AvatarImage src={founder.avatar} alt={founder.name} />
                                <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                              </Avatar>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm">Learn More</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#4A3333]">
              Recent Projects
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {recentProjects.map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl font-semibold">{project.name}</h3>
                      <Badge variant="outline">{project.stage}</Badge>
                    </div>
                    <p className="text-[#6B5151] mb-4 line-clamp-3">{project.description}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      <Badge variant="secondary">{project.industry}</Badge>
                      <Badge variant="secondary">{project.fundingGoal}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-[#6B5151]">Team:</span>
                        <div className="flex -space-x-2">
                          {project.founders.map((founder) => (
                            <Avatar key={founder.id} className="h-8 w-8 border-2 border-white">
                              <AvatarImage src={founder.avatar} alt={founder.name} />
                              <AvatarFallback>{founder.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                      </div>
                      <Button variant="outline" size="sm">View Project</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 bg-[#FDF8F7]">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#4A3333]">
              Recent Members
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {recentUsers.map((user) => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-4 text-center">
                    <Avatar className="h-20 w-20 mx-auto mb-4">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-1">{user.name}</h3>
                    <p className="text-sm text-[#6B5151] mb-2">{user.role}</p>
                    <Badge variant="outline" className="mt-2">{user.expertise}</Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#4A3333]">
              Success Stories
            </h2>
            <TestimonialsCarousel />
          </div>
        </section>

        <section className="py-20 bg-[#FDF8F7]">
          <div className="container mx-auto px-4">
            <FeaturedPitch
              title={featuredPitch.title}
              description={featuredPitch.description}
              founderName={featuredPitch.founder.name}
              founderAvatar={featuredPitch.founder.avatar}
              industry={featuredPitch.industry}
              fundingGoal={featuredPitch.fundingGoal}
              pitchId={featuredPitch.id}
            />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <UpcomingEvents events={upcomingEvents} />
          </div>
        </section>

        <section className="py-20 bg-[#FDF8F7]">
          <div className="container mx-auto px-4">
            <MentorSpotlight mentor={featuredMentor} />
          </div>
        </section>

        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              CoFounderHub in Numbers
            </h2>
            <StatsCounter />
          </div>
        </section>

        <section className="py-20 bg-gradient-to-t from-background to-secondary/20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-foreground">
              Ready to Find Your Co-Founder?
            </h2>
            <p className="text-lg mb-8 text-muted-foreground max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have found their perfect match on CoFounderHub.
            </p>
            <Button 
              size="lg"
            >
              Create Your Profile
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

