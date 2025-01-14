'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

type Subscription = {
  plan: 'FREE' | 'GOLD' | 'PREMIUM'
  status: 'ACTIVE' | 'CANCELED' | 'PAST_DUE'
  currentPeriodEnd: string
}

const planFeatures = {
  FREE: ['Basic profile', 'Limited project creation', 'Community access'],
  GOLD: ['Enhanced profile', 'Unlimited projects', 'Priority matching', 'Access to funding opportunities'],
  PREMIUM: ['All Gold features', 'Dedicated mentor', 'AI-powered startup tools', 'Virtual office hours']
}

const planPrices = {
  FREE: 0,
  GOLD: 50,
  PREMIUM: 100
}

export function SubscriptionManager() {
  const [subscription, setSubscription] = useState<Subscription | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    fetchSubscription()
  }, [])

  const fetchSubscription = async () => {
    const res = await fetch('/api/subscription')
    if (res.ok) {
      const data = await res.json()
      setSubscription(data)
    }
  }

  const handleUpgrade = async (plan: 'GOLD' | 'PREMIUM') => {
    const res = await fetch('/api/subscription/upgrade', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ plan })
    })

    if (res.ok) {
      const { checkoutUrl } = await res.json()
      window.location.href = checkoutUrl
    } else {
      toast({
        title: "Error",
        description: "Failed to initiate upgrade. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handleCancel = async () => {
    const res = await fetch('/api/subscription/cancel', { method: 'POST' })

    if (res.ok) {
      toast({
        title: "Subscription Canceled",
        description: "Your subscription will be canceled at the end of the current billing period.",
      })
      fetchSubscription()
    } else {
      toast({
        title: "Error",
        description: "Failed to cancel subscription. Please try again.",
        variant: "destructive",
      })
    }
  }

  if (!subscription) {
    return <div>Loading subscription information...</div>
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Your Subscription</h2>
      <Card>
        <CardHeader>
          <CardTitle>{subscription.plan} Plan</CardTitle>
          <CardDescription>Status: {subscription.status}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Current period ends: {new Date(subscription.currentPeriodEnd).toLocaleDateString()}</p>
          <ul className="list-disc list-inside mt-4">
            {planFeatures[subscription.plan].map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          {subscription.plan !== 'PREMIUM' && (
            <Button onClick={() => handleUpgrade('PREMIUM')} className="mr-2">Upgrade to Premium</Button>
          )}
          {subscription.plan === 'FREE' && (
            <Button onClick={() => handleUpgrade('GOLD')} className="mr-2">Upgrade to Gold</Button>
          )}
          {subscription.plan !== 'FREE' && subscription.status === 'ACTIVE' && (
            <Button onClick={handleCancel} variant="outline">Cancel Subscription</Button>
          )}
        </CardFooter>
      </Card>

      <h2 className="text-2xl font-bold mt-8">Available Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {(['FREE', 'GOLD', 'PREMIUM'] as const).map((plan) => (
          <Card key={plan}>
            <CardHeader>
              <CardTitle>{plan}</CardTitle>
              <CardDescription>₵{planPrices[plan]} / month</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside">
                {planFeatures[plan].map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan !== subscription.plan && (
                <Button onClick={() => handleUpgrade(plan === 'FREE' ? 'GOLD' : 'PREMIUM')}>
                  {plan === 'FREE' ? 'Current Plan' : `Upgrade to ${plan}`}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

