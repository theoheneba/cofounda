'use client'

import { useState, useEffect } from 'react'
import { Bar, Line } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, PointElement, LineElement, Title, Tooltip, Legend)

type AnalyticsData = {
  profileViews: number[]
  matchRequests: number[]
  projectViews: number[]
  labels: string[]
}

export function AnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null)

  useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    const res = await fetch('/api/analytics')
    if (res.ok) {
      const data = await res.json()
      setAnalyticsData(data)
    }
  }

  if (!analyticsData) {
    return <div>Loading analytics...</div>
  }

  const profileViewsData = {
    labels: analyticsData.labels,
    datasets: [
      {
        label: 'Profile Views',
        data: analyticsData.profileViews,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  }

  const matchRequestsData = {
    labels: analyticsData.labels,
    datasets: [
      {
        label: 'Match Requests',
        data: analyticsData.matchRequests,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  }

  const projectViewsData = {
    labels: analyticsData.labels,
    datasets: [
      {
        label: 'Project Views',
        data: analyticsData.projectViews,
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Analytics Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-2">Profile Views</h3>
          <Bar data={profileViewsData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Match Requests</h3>
          <Line data={matchRequestsData} />
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-2">Project Views</h3>
          <Bar data={projectViewsData} />
        </div>
      </div>
    </div>
  )
}

