'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

type Slide = {
  title: string
  content: string
}

export function PitchDeckBuilder() {
  const [slides, setSlides] = useState<Slide[]>([
    { title: 'Problem', content: '' },
    { title: 'Solution', content: '' },
    { title: 'Market Size', content: '' },
    { title: 'Product', content: '' },
    { title: 'Business Model', content: '' },
    { title: 'Competition', content: '' },
    { title: 'Team', content: '' },
    { title: 'Financials', content: '' },
  ])

  const updateSlide = (index: number, field: keyof Slide, value: string) => {
    const newSlides = [...slides]
    newSlides[index][field] = value
    setSlides(newSlides)
  }

  const generatePDF = async () => {
    const res = await fetch('/api/generate-pitch-deck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slides }),
    })

    if (res.ok) {
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.style.display = 'none'
      a.href = url
      a.download = 'pitch-deck.pdf'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
    }
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pitch Deck Builder</h2>
      {slides.map((slide, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{slide.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder={`Enter content for ${slide.title}`}
              value={slide.content}
              onChange={(e) => updateSlide(index, 'content', e.target.value)}
              rows={4}
            />
          </CardContent>
        </Card>
      ))}
      <Button onClick={generatePDF}>Generate Pitch Deck PDF</Button>
    </div>
  )
}

