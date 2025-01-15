import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Video } from 'lucide-react'

type Room = {
  id: string
  name: string
  topic: string
  participants: number
  maxParticipants: number
  status: 'open' | 'full' | 'closed'
}

type VirtualNetworkingRoomsProps = {
  rooms: Room[]
}

export function VirtualNetworkingRooms({ rooms }: VirtualNetworkingRoomsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {rooms.map((room) => (
        <Card key={room.id}>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>{room.name}</span>
              <Badge variant={room.status === 'open' ? 'success' : room.status === 'full' ? 'warning' : 'secondary'}>
                {room.status}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">{room.topic}</p>
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                <span>{room.participants}/{room.maxParticipants}</span>
              </div>
              <Button disabled={room.status !== 'open'}>
                <Video className="mr-2 h-4 w-4" />
                Join Room
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

