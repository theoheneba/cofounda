import { ResourceHub } from "@/components/ResourceHub"

async function getResources() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch resources')
  return res.json()
}

export default async function ResourceHubPage() {
  const resources = await getResources()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Resource Hub</h1>
      <ResourceHub resources={resources} />
    </div>
  )
}

