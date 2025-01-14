import { CofounderMatches } from "@/components/CofounderMatches"

export default function MatchesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Find Cofounders</h1>
      <div className="grid gap-6">
        <CofounderMatches />
      </div>
    </div>
  )
}

