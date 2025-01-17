"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    name: "Alice Johnson",
    role: "Co-Founder, TechStart",
    avatar: "/avatars/alice-johnson.jpg",
    quote: "Cofoundar helped me find the perfect technical co-founder for my startup. We've been working together for 6 months now and our progress has been incredible!",
  },
  {
    id: 2,
    name: "David Lee",
    role: "Co-Founder, GreenEnergy",
    avatar: "/avatars/david-lee.jpg",
    quote: "I was skeptical at first, but Cofoundar's matching algorithm is spot-on. I found a co-founder who complements my skills perfectly.",
  },
  {
    id: 3,
    name: "Sarah Martinez",
    role: "Co-Founder, HealthTech Solutions",
    avatar: "/avatars/sarah-martinez.jpg",
    quote: "The network and resources provided by Cofoundar have been invaluable. Not only did I find a great co-founder, but we also connected with mentors and investors through the platform.",
  },
]

export function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-6">Success Stories</h2>
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={currentTestimonial.avatar} alt={currentTestimonial.name} />
              <AvatarFallback>{currentTestimonial.name[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{currentTestimonial.name}</p>
              <p className="text-sm text-muted-foreground">{currentTestimonial.role}</p>
            </div>
          </div>
          <p className="text-lg mb-4">"{currentTestimonial.quote}"</p>
          <div className="flex justify-between">
            <Button variant="outline" size="icon" onClick={prevTestimonial}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" onClick={nextTestimonial}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </section>
  )
}

