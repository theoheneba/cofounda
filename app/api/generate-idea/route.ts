import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/app/lib/auth'
import OpenAI from 'openai'

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { industry } = await req.json()

  if (!industry) {
    return NextResponse.json({ error: 'Industry is required' }, { status: 400 })
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a startup idea generator. Generate a unique and innovative startup idea based on the given industry." },
        { role: "user", content: `Generate a startup idea for the ${industry} industry.` }
      ],
    })

    const idea = completion.choices[0].message.content

    return NextResponse.json({ idea })
  } catch (error) {
    console.error('OpenAI API error:', error)
    return NextResponse.json({ error: 'Failed to generate idea' }, { status: 500 })
  }
}

