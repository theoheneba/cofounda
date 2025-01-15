import { FundingTracker } from "@/components/FundingTracker"

async function getFundingData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/funding`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch funding data')
  return res.json()
}

export default async function FundingTrackerPage() {
  const fundingData = await getFundingData()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Funding Tracker</h1>
      <FundingTracker fundingData={fundingData} />
    </div>
  )
}

