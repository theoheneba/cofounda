import { SkillsMarketplace } from "@/components/SkillsMarketplace"

async function getSkillsListings() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/skills-listings`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch skills listings')
  return res.json()
}

export default async function SkillsMarketplacePage() {
  const skillsListings = await getSkillsListings()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Skills Marketplace</h1>
      <SkillsMarketplace listings={skillsListings} />
    </div>
  )
}

