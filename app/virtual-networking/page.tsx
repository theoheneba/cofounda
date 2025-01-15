import { VirtualNetworkingRooms } from "@/components/VirtualNetworkingRooms"

async function getNetworkingRooms() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/networking-rooms`, { cache: 'no-store' })
  if (!res.ok) throw new Error('Failed to fetch networking rooms')
  return res.json()
}

export default async function VirtualNetworkingPage() {
  const rooms = await getNetworkingRooms()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Virtual Networking Rooms</h1>
      <VirtualNetworkingRooms rooms={rooms} />
    </div>
  )
}

