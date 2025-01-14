import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/app/lib/prisma'
import { authOptions } from '@/app/lib/auth'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const receiverId = searchParams.get('receiverId')

  if (!receiverId) {
    return NextResponse.json({ error: 'Receiver ID is required' }, { status: 400 })
  }

  const stream = new ReadableStream({
    async start(controller) {
      const sendMessage = (message: any) => {
        controller.enqueue(`data: ${JSON.stringify(message)}\n\n`)
      }

      const interval = setInterval(async () => {
        const newMessages = await prisma.message.findMany({
          where: {
            OR: [
              { senderId: session.user.id, receiverId },
              { senderId: receiverId, receiverId: session.user.id },
            ],
            createdAt: { gt: new Date(Date.now() - 5000) }, // Messages from the last 5 seconds
          },
          orderBy: { createdAt: 'asc' },
        })

        newMessages.forEach(sendMessage)
      }, 5000)

      // Clean up the interval when the connection is closed
      return () => clearInterval(interval)
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  })
}

