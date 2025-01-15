import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusCircle, Trash2 } from 'lucide-react'

type Slide = {
  id: string
  title: string
  content: string
}

export function PitchDeckBuilder() {
  const [slides, setSlides] = useState<Slide[]>([
    { id: '1', title: 'Problem', content: '' },
    { id: '2', title: 'Solution', content: '' },
    { id: '3', title: 'Market Size', content: '' },
    { id: '4', title: 'Product', content: '' },
    { id: '5', title: 'Traction', content: '' },
    { id: '6', title: 'Team', content: '' },
    { id: '7', title: 'Financials', content: '' },
    { id: '8', title: 'Competition', content: '' },
    { id: '9', title: 'Funding Ask', content: '' },
  ])

  const addSlide = () => {
    const newSlide: Slide = {
      id: Date.now().toString(),
      title: 'New Slide',
      content: '',
    }
    setSlides([...slides, newSlide])
  }

  const updateSlide = (id: string, field: keyof Slide, value: string) => {
    setSlides(slides.map(slide => 
      slide.id === id ? { ...slide, [field]: value } : slide
    ))
  }

  const deleteSlide = (id: string) => {
    setSlides(slides.filter(slide => slide.id !== id))
  }

  return (
    <div className="space-y-6">
      {slides.map((slide) => (
        <Card key={slide.id} className="bg-card">
          <CardHeader>
            <CardTitle>
              <Input
                value={slide.title}
                onChange={(e) => updateSlide(slide.id, 'title', e.target.value)}
                className="text-xl font-bold text-foreground bg-background"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              value={slide.content}
              onChange={(e) => updateSlide(slide.id, 'content', e.target.value)}
              placeholder="Enter slide content..."
              rows={5}
              className="bg-background text-foreground"
            />
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => deleteSlide(slide.id)}
              className="mt-2"
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Delete Slide
            </Button>
          </CardContent>
        </Card>
      ))}
      <Button onClick={addSlide} className="w-full">
        <PlusCircle className="mr-2 h-4 w-4" />
        Add Slide
      </Button>
      <Button className="w-full">Save Pitch Deck</Button>
    </div>
  )
}

