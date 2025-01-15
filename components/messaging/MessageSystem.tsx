import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
  id: number
  sender: string
  content: string
  timestamp: string
  avatar: string
}

export function MessageSystem() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "John Doe",
      content: "Hi, I saw your pitch about the AI-powered EdTech platform. I'm interested in discussing further.",
      timestamp: "2023-06-15 10:30 AM",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: 2,
      sender: "You",
      content: "Hello John! Thanks for reaching out. I'd be happy to discuss the project with you. What's your background?",
      timestamp: "2023-06-15 10:35 AM",
      avatar: "/placeholder.svg?height=40&width=40"
    },
    {
      id: 3,
      sender: "John Doe",
      content: "I have 5 years of experience in machine learning and have worked on several EdTech projects. I think my skills could complement yours well.",
      timestamp: "2023-06-15 10:40 AM",
      avatar: "/placeholder.svg?height=40&width=40"
    },
  ])

  const [newMessage, setNewMessage] = useState("")

  const sendMessage = () => {
    if (newMessage.trim() === "") return

    const message: Message = {
      id: messages.length + 1,
      sender: "You",
      content: newMessage,
      timestamp: new Date().toLocaleString(),
      avatar: "/placeholder.svg?height=40&width=40"
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Messages</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "You" ? "justify-end" : "justify-start"} mb-4`}>
              <div className={`flex ${message.sender === "You" ? "flex-row-reverse" : "flex-row"} items-start`}>
                <Avatar className="h-8 w-8">
                  <AvatarImage src={message.avatar} alt={message.sender} />
                  <AvatarFallback>{message.sender[0]}</AvatarFallback>
                </Avatar>
                <div className={`mx-2 ${message.sender === "You" ? "text-right" : "text-left"}`}>
                  <p className="text-sm font-semibold">{message.sender}</p>
                  <div className={`mt-1 p-2 rounded-lg ${message.sender === "You" ? "bg-primary text-primary-foreground" : "bg-secondary"}`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{message.timestamp}</p>
                </div>
              </div>
            </div>
          ))}
        </ScrollArea>
        <div className="flex mt-4">
          <Input
            placeholder="Type your message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-grow"
          />
          <Button onClick={sendMessage} className="ml-2">Send</Button>
        </div>
      </CardContent>
    </Card>
  )
}

