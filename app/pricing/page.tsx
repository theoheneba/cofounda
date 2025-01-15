import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from 'lucide-react'

const pricingPlans = [
  {
    name: "Basic",
    price: "Free",
    description: "For individuals just starting out",
    features: [
      "Create a profile",
      "Browse co-founder listings",
      "Limited messaging",
      "Access to basic resources",
    ],
  },
  {
    name: "Pro",
    price: "$19.99/month",
    description: "For serious entrepreneurs",
    features: [
      "All Basic features",
      "Unlimited messaging",
      "Advanced co-founder matching",
      "Access to premium resources",
      "Pitch deck reviews",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For startups and organizations",
    features: [
      "All Pro features",
      "Dedicated account manager",
      "Custom integrations",
      "Team collaboration tools",
      "Priority support",
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h1>
      <div className="grid md:grid-cols-3 gap-8">
        {pricingPlans.map((plan) => (
          <Card key={plan.name} className="flex flex-col">
            <CardHeader>
              <CardTitle>{plan.name}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <Check className="mr-2 h-4 w-4 text-green-500" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Choose Plan</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

