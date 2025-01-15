import { PitchExplorer } from "@/components/pitch/PitchExplorer"

export default function ExplorePitchesPage() {
  return (
    <div className="container mx-auto p-6 pt-24">
      <h1 className="text-3xl font-bold mb-6">Explore Startup Pitches</h1>
      <PitchExplorer />
    </div>
  )
}

