import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const recentActivities = [
  { id: 1, action: "New user registered", user: "John Doe", timestamp: "2 minutes ago" },
  { id: 2, action: "New pitch created", user: "Jane Smith", timestamp: "15 minutes ago" },
  { id: 3, action: "Match made", users: ["Alice Johnson", "Bob Williams"], timestamp: "1 hour ago" },
  { id: 4, action: "Project updated", user: "Charlie Brown", project: "AI-Powered EdTech", timestamp: "3 hours ago" },
  { id: 5, action: "Funding goal reached", user: "Diana Prince", project: "Green Energy Solution", timestamp: "5 hours ago" },
]

export function RecentActivity() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions across the platform</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {recentActivities.map((activity) => (
            <li key={activity.id} className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                {activity.action.charAt(0)}
              </div>
              <div className="flex-grow">
                <p className="text-sm font-medium">{activity.action}</p>
                <p className="text-xs text-gray-500">
                  {activity.user || (activity.users && activity.users.join(" and "))}
                  {activity.project && ` - ${activity.project}`}
                </p>
              </div>
              <div className="flex-shrink-0 text-xs text-gray-500">{activity.timestamp}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

