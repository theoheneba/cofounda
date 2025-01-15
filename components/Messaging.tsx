import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Send } from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Messaging() {
  const messages = [
    {
      id: 1,
      sender: 'John Doe',
      message: "Hi, I saw your project and I think we could collaborate as cofounders.",
      timestamp: '10:30 AM',
      avatar: '/placeholder.svg?height=40&width=40',
    },
    {
      id: 2,
      sender: 'You',
      message: "Thanks! I'd love to hear more about your skills and experience.",
      timestamp: '10:32 AM',
      avatar: '/placeholder.svg?height=40&width=40',
    },
  ]

  return (
    <Card className="h-[400px] flex flex-col">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <div className="flex-1 overflow-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start gap-2 ${
                message.sender === 'You' ? 'flex-row-reverse' : ''
              }`}
            >
              <Avatar>
                <AvatarImage src={message.avatar} alt={message.sender} />
                <AvatarFallback>{message.sender[0]}</AvatarFallback>
              </Avatar>
              <div
                className={`rounded-lg p-2 max-w-[80%] ${
                  message.sender === 'You'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                }`}
              >
                <p className="text-sm">{message.message}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mt-4">
          <Input placeholder="Type a message..." />
          <Button size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

