import { Card } from "@/components/ui/card"
import { Eye, Users, MessageSquare } from 'lucide-react'

export function DashboardStats() {
  const stats = [
    {
      title: "Profile Views",
      value: "1,234",
      change: "+12%",
      icon: Eye,
    },
    {
      title: "Total Matches",
      value: "56",
      change: "+3",
      icon: Users,
    },
    {
      title: "Active Conversations",
      value: "28",
      change: "+5",
      icon: MessageSquare,
    },
  ]

  return (
    <>
      {stats.map((stat) => (
        <Card key={stat.title} className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.title}</p>
              <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
              <p className="text-sm text-green-600 mt-1">{stat.change} this week</p>
            </div>
            <div className="h-12 w-12 bg-[#FDF8F7] rounded-full flex items-center justify-center">
              <stat.icon className="h-6 w-6 text-[#E27D60]" />
            </div>
          </div>
        </Card>
      ))}
    </>
  )
}

