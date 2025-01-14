'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import Pusher from "pusher-js"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type Message = {
  id: string
  content: string
  senderId: string
  receiverId: string
  createdAt: string
}

type ChatProps = {
  receiverId: string
}

export function Chat({ receiverId }: ChatProps) {
  const { data: session } = useSession()
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")

  useEffect(() => {
    if (session?.user?.id) {
      const pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!, {
        cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!,
      })

      const channel = pusher.subscribe(`private-user-${session.user.id}`)
      channel.bind("new-message", (data: Message) => {
        setMessages((prevMessages) => [...prevMessages, data])
      })

      return () => {
        pusher.unsubscribe(`private-user-${session.user.id}`)
      }
    }
  }, [session])

  const sendMessage = async () => {
    if (newMessage.trim() === "") return

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newMessage, receiverId }),
      })

      if (res.ok) {
        const sentMessage = await res.json()
        setMessages((prevMessages) => [...prevMessages, sentMessage])
        setNewMessage("")
      }
    } catch (error) {
      console.error("Error sending message:", error)
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.senderId === session?.user?.id ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs px-4 py-2 rounded-lg ${
                message.senderId === session?.user?.id
                  ? "bg-[#B85C3C] text-white"
                  : "bg-gray-200 text-[#4A2515]"
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>
      <div className="border-t p-4 flex">
        <Input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 mr-2"
        />
        <Button onClick={sendMessage} className="bg-[#B85C3C] hover:bg-[#A34E32]">
          Send
        </Button>
      </div>
    </div>
  )
}

