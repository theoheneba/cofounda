import { Messaging } from "@/components/Messaging"

export default function MessagesPage() {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Messages</h1>
      <div className="grid gap-6">
        <Messaging />
      </div>
    </div>
  )
}

