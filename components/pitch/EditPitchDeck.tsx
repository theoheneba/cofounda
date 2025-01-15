"use client"

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "@/components/ui/use-toast"

type Slide = {
  id: number
  title: string
  content: string
}

export function EditPitchDeck({ initialSlides }: { initialSlides: Slide[] }) {
  const [slides, setSlides] = useState<Slide[]>(initialSlides)

  const addSlide = () => {
    const newSlide: Slide = {
      id: slides.length + 1,
      title: `New Slide ${slides.length + 1}`,
      content: ""
    }
    setSlides([...slides, newSlide])
  }

  const updateSlide = (id: number, field: 'title' | 'content', value: string) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ))
  }

  const deleteSlide = (id: number) => {
    setSlides(slides.filter(slide => slide.id !== id))
  }

  const savePitchDeck = async () => {
    // Here you would typically send the updated pitch deck to your backend
    await new Promise(resolve => setTimeout(resolve, 1000)) // Simulating API call
    toast({
      title: "Pitch deck saved",
      description: "Your pitch deck has been successfully updated.",
    })
  }

  return (
    <div className="space-y-6">
      {slides.map((slide) => (
        <Card key={slide.id}>
          <CardHeader>
            <CardTitle>
              <Input
                value={slide.title}
                onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                className="text-lg font-semibold"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={slide.content}
              onChange={(e) => updateSlide(slide.id, 'content', e.target.value)}
              placeholder="Enter slide content..."
              rows={5}
            />
            <Button variant="destructive" onClick={() => deleteSlide(slide.id)} className="mt-2">
              Delete Slide
            </Button>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-between">
        <Button onClick={addSlide}>Add Slide</Button>
        <Button onClick={savePitchDeck}>Save Pitch Deck</Button>
      </div>
    </div>
  )
}

