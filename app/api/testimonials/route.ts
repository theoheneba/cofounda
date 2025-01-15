import { NextResponse } from "next/server"
import { db } from "@/lib/db"

export async function GET() {
  try {
    const testimonials = await db.testimonial.findMany({
      select: {
        id: true,
        quote: true,
        author: true,
        role: true,
        avatar: true,
      },
    })

    return NextResponse.json(testimonials)
  } catch (error) {
    console.error("Error fetching testimonials:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

