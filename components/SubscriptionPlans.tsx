import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Basic',
    price: 'Free',
    features: ['Create a profile', 'Browse co-founder listings', 'Access to basic resources'],
  },
  {
    name: 'Pro',
    price: '$19.99/month',
    features: ['All Basic features', 'Advanced matching algorithm', 'Unlimited messaging', 'Access to premium resources'],
  },
  {
    name: 'Enterprise',
    price: 'Contact us',
    features: ['All Pro features', 'Dedicated account manager', 'Custom integrations', 'Priority support'],
  },
]

export function SubscriptionPlans() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card key={plan.name}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold mb-4">{plan.price}</p>
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
            <Button className="w-full">
              {plan.name === 'Enterprise' ? 'Contact Sales' : 'Subscribe'}
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

