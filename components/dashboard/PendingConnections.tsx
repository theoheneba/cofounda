import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

export function PendingConnections() {
  const pending = [
    {
      id: 1,
      name: "David Wilson",
      role: "Product Manager",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "2 days ago",
    },
    {
      id: 2,
      name: "Emily Zhang",
      role: "UX Designer",
      avatar: "/placeholder.svg?height=40&width=40",
      time: "5 days ago",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Pending Connections</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pending.map((connection) => (
            <div key={connection.id} className="flex items-center gap-4">
              <Avatar>
                <AvatarImage src={connection.avatar} alt={connection.name} />
                <AvatarFallback>{connection.name.split(" ").map(n => n[0]).join("")}</AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm">{connection.name}</h4>
                <p className="text-xs text-muted-foreground">{connection.role}</p>
                <p className="text-xs text-muted-foreground mt-1">Requested {connection.time}</p>
              </div>
              <div className="flex flex-col gap-2">
                <Button size="sm" className="bg-[#E27D60] hover:bg-[#c66a51]">
                  Accept
                </Button>
                <Button size="sm" variant="outline">
                  Decline
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

