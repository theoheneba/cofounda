import { PitchList } from "@/components/dashboard/PitchList"
import { MatchesList } from "@/components/dashboard/MatchesList"
import { DashboardStats } from "@/components/dashboard/DashboardStats"
import { PendingConnections } from "@/components/dashboard/PendingConnections"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DashboardStats />
      </div>

      <Tabs defaultValue="pitches">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pitches">Pitches</TabsTrigger>
          <TabsTrigger value="matches">Matches</TabsTrigger>
          <TabsTrigger value="connections">Connections</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>
        <TabsContent value="pitches">
          <Card>
            <CardHeader>
              <CardTitle>Your Pitches</CardTitle>
            </CardHeader>
            <CardContent>
              <PitchList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="matches">
          <Card>
            <CardHeader>
              <CardTitle>Your Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <MatchesList />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="connections">
          <Card>
            <CardHeader>
              <CardTitle>Pending Connections</CardTitle>
            </CardHeader>
            <CardContent>
              <PendingConnections />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              {/* Add recent activity component here */}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

