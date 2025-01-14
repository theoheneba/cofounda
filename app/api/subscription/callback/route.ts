import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import Paystack from 'paystack'

const paystack = new Paystack(process.env.PAYSTACK_SECRET_KEY!)

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const reference = searchParams.get('reference')

  if (!reference) {
    return NextResponse.json({ error: 'No reference provided' }, { status: 400 })
  }

  try {
    const paystackResponse = await paystack.transaction.verify(reference)

    if (paystackResponse.data.status === 'success') {
      const { userId, plan } = paystackResponse.data.metadata

      await prisma.subscription.upsert({
        where: { userId },
        update: {
          plan,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
        },
        create: {
          userId,
          plan,
          status: 'ACTIVE',
          currentPeriodStart: new Date(),
          currentPeriodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      })

      await prisma.transaction.create({
        data: {
          userId,
          amount: paystackResponse.data.amount / 100, // Convert from pesewas to cedis
          currency: 'GHS',
          status: 'SUCCESSFUL',
          paystackReference: reference,
        },
      })

      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`)
    } else {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/subscription-failed`)
    }
  } catch (error) {
    console.error('Paystack verification error:', error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/subscription-failed`)
  }
}

