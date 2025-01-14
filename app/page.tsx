import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { RocketIcon, ShieldCheckIcon, MessageSquareIcon, FileIcon, Users, Lightbulb, TrendingUp } from 'lucide-react'
import { FeaturedStartups } from "@/components/FeaturedStartups"
import { TestimonialsCarousel } from "@/components/TestimonialsCarousel"
import { StatsCounter } from "@/components/StatsCounter"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="pt-32 pb-16 bg-[#FDF8F7]">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-5xl font-bold mb-6 text-[#4A3333]">
              Find Your Perfect{" "}
              <span className="text-[#E27D60]">Co-Founder</span>
            </h1>
            <p className="text-lg mb-8 text-[#6B5151] max-w-2xl mx-auto">
              Connect with passionate entrepreneurs and professionals who share
              your vision and complement your skills. Build something amazing
              together.
            </p>
            <div className="flex justify-center gap-4">
              <Button 
                size="lg" 
                className="bg-[#E27D60] hover:bg-[#c66a51]"
              >
                <RocketIcon className="mr-2 h-4 w-4" />
                Get Started
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="border-[#E27D60] text-[#E27D60] hover:bg-[#E27D60] hover:text-white"
              >
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12 text-[#4A3333]">
              Why Choose CoFounderHub?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-[#E27D60] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Smart Matching</h3>
                  <p className="text-[#6B5151]">Our AI-powered algorithm finds the perfect co-founder based on skills, experience, and goals.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Lightbulb className="h-12 w-12 text-[#E27D60] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Idea Validation</h3>
                  <p className="text-[#6B5151]">Get feedback on your startup ideas from experienced entrepreneurs and mentors.</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <TrendingUp className="h-12 w-12 text-[#E27D60] mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Growth Resources</h3>
                  <p className="text-[#6B5151]">Access a wealth of resources, workshops, and tools to help your startup succeed.</p>
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
            <FeaturedStartups />
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

        <section className="py-20 bg-[#E27D60] text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              CoFounderHub in Numbers
            </h2>
            <StatsCounter />
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#4A3333]">
              Ready to Find Your Co-Founder?
            </h2>
            <p className="text-lg mb-8 text-[#6B5151] max-w-2xl mx-auto">
              Join thousands of entrepreneurs who have found their perfect match on CoFounderHub.
            </p>
            <Button 
              size="lg" 
              className="bg-[#E27D60] hover:bg-[#c66a51]"
            >
              Create Your Profile
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

