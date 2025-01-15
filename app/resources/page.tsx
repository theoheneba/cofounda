import { ResourceLibrary } from "@/components/ResourceLibrary"

export default function ResourcesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Resources</h1>
      <div className="grid gap-6">
        <ResourceLibrary />
      </div>
    </div>
  )
}

