import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { PlusCircle, Trash2 } from 'lucide-react'

type Slide = {
  id: number
  title: string
  content: string
}

export function PitchDeckBuilder() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: 1, title: "Problem", content: "" },
    { id: 2, title: "Solution", content: "" },
    { id: 3, title: "Market Size", content: "" },
    { id: 4, title: "Business Model", content: "" },
    { id: 5, title: "Competition", content: "" },
    { id: 6, title: "Team", content: "" },
    { id: 7, title: "Financials", content: "" },
    { id: 8, title: "Ask", content: "" },
  ])

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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Pitch Deck Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {slides.map((slide) => (
            <div key={slide.id} className="mb-6 p-4 border rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Input
                  value={slide.title}
                  onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                  className="text-lg font-semibold"
                />
                <Button variant="ghost" size="icon" onClick={() => deleteSlide(slide.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <Textarea
                value={slide.content}
                onChange={(e) => updateSlide(slide.id, 'content', e.target.value)}
                placeholder="Enter slide content..."
                className="mt-2"
                rows={5}
              />
            </div>
          ))}
        </ScrollArea>
        <Button onClick={addSlide} className="mt-4">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add Slide
        </Button>
      </CardContent>
    </Card>
  )
}

