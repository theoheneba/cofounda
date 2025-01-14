'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import Link from 'next/link'

type FundingOpportunity = {
  id: string
  name: string
  type: 'ACCELERATOR' | 'INCUBATOR' | 'ANGEL_INVESTOR' | 'VC_FUND'
  description: string
  applicationDeadline: string
}

export function FundingOpportunities() {
  const [opportunities, setOpportunities] = useState<FundingOpportunity[]>([])

  useEffect(() => {
    fetchOpportunities()
  }, [])

  const fetchOpportunities = async () => {
    const res = await fetch('/api/funding-opportunities')
    if (res.ok) {
      const data = await res.json()
      setOpportunities(data)
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Funding Opportunities</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {opportunities.map((opportunity) => (
          <li key={opportunity.id} className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold">{opportunity.name}</h3>
            <p className="text-sm text-gray-600">Type: {opportunity.type.replace('_', ' ')}</p>
            <p className="mt-2">{opportunity.description}</p>
            <p className="text-sm text-gray-600 mt-2">Application Deadline: {new Date(opportunity.applicationDeadline).toLocaleDateString()}</p>
            <Button asChild className="mt-4">
              <Link href={`/funding/${opportunity.id}`}>Learn More</Link>
            </Button>
          </li>
        ))}
      </ul>
    </div>
  )
}

