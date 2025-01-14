import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/lib/prisma'
import { authOptions } from '@/lib/auth'
import Paystack from 'paystack'

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!)

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { plan } = await req.json()

  if (!['GOLD', 'PREMIUM'].includes(plan)) {
    return NextResponse.json({ error: 'Invalid plan' }, { status: 400 })
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: { subscription: true },
  })

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  const amount = plan === 'GOLD' ? 5000 : 10000 // Amount in pesewas (50 or 100 Ghana cedis)

  try {
    const paystackResponse = await paystack.transaction.initialize({
      amount,
      email: user.email!,
      currency: 'GHS',
      callback_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/subscription/callback`,
      metadata: {
        userId: user.id,
        plan,
      },
    })

    return NextResponse.json({ checkoutUrl: paystackResponse.data.authorization_url })
  } catch (error) {
    console.error('Paystack error:', error)
    return NextResponse.json({ error: 'Failed to initiate payment' }, { status: 500 })
  }
}

