import { Card } from "@/components/ui/card"
import { Users, FileText, AlertTriangle, CreditCard } from 'lucide-react'

export function AdminStats() {
  const stats = [
    {
      title: "Total Users",
      value: "5,234",
      change: "+123",
      icon: Users,
    },
    {
      title: "Active Pitches",
      value: "892",
      change: "+41",
      icon: FileText,
    },
    {
      title: "Reported Content",
      value: "23",
      change: "+5",
      icon: AlertTriangle,
    },
    {
      title: "Revenue (USD)",
      value: "$12,456",
      change: "+$1,234",
      icon: CreditCard,
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
              <p className="text-sm text-green-600 mt-1">{stat.change} this month</p>
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

