import { EventsAndNetworking } from "@/components/EventsAndNetworking"

export default function EventsPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Events & Networking</h1>
      <div className="grid gap-6">
        <EventsAndNetworking />
      </div>
    </div>
  )
}

