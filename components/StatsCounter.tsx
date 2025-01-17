"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

const stats = [
  { label: "Startups Founded", value: 500 },
  { label: "Co-Founders Matched", value: 1000 },
  { label: "Success Rate", value: 85 },
]

export function StatsCounter() {
  const [counts, setCounts] = useState(stats.map(() => 0))

  useEffect(() => {
    const interval = setInterval(() => {
      setCounts((prevCounts) =>
        prevCounts.map((count, index) => {
          const target = stats[index].value
          const increment = Math.ceil(target / 100)
          return Math.min(count + increment, target)
        })
      )
    }, 20)

    return () => clearInterval(interval)
  }, [])

  return (
    <section className="mb-12">
      <h2 className="text-3xl font-semibold mb-6">Our Impact</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <Card key={stat.label}>
            <CardContent className="p-6">
              <p className="text-3xl font-bold mb-2">
                {counts[index]}
                {stat.label === "Success Rate" && "%"}
              </p>
              <p className="text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}

