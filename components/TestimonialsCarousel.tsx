"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight } from 'lucide-react'

type Testimonial = {
  id: number
  quote: string
  author: string
  role: string
  avatar: string
}

export function TestimonialsCarousel() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch('/api/testimonials')
        if (!response.ok) {
          throw new Error('Failed to fetch testimonials')
        }
        const data = await response.json()
        setTestimonials(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTestimonials()
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  if (isLoading) return <div>Loading testimonials...</div>
  if (error) return <div>Error: {error}</div>
  if (testimonials.length === 0) return null

  return (
    <div className="relative">
      <Card className="max-w-3xl mx-auto">
        <CardContent className="p-8 text-center">
          <blockquote className="text-xl italic mb-4">"{testimonials[currentIndex].quote}"</blockquote>
          <div className="flex items-center justify-center space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={testimonials[currentIndex].avatar} alt={testimonials[currentIndex].author} />
              <AvatarFallback>{testimonials[currentIndex].author.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <div className="text-left">
              <p className="font-semibold">{testimonials[currentIndex].author}</p>
              <p className="text-[#6B5151]">{testimonials[currentIndex].role}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 left-0 transform -translate-y-1/2"
        onClick={prevTestimonial}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-1/2 right-0 transform -translate-y-1/2"
        onClick={nextTestimonial}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  )
}

