'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { GithubIcon, LinkedinIcon, DribbbleIcon as BehanceIcon } from 'lucide-react'

type Integration = {
  platform: 'GITHUB' | 'LINKEDIN' | 'BEHANCE'
  connected: boolean
  username?: string
}

export function ExternalPlatformIntegration() {
  const [integrations, setIntegrations] = useState<Integration[]>([
    { platform: 'GITHUB', connected: false },
    { platform: 'LINKEDIN', connected: false },
    { platform: 'BEHANCE', connected: false },
  ])

  useEffect(() => {
    fetchIntegrations()
  }, [])

  const fetchIntegrations = async () => {
    const res = await fetch('/api/integrations')
    if (res.ok) {
      const data = await res.json()
      setIntegrations(data)
    }
  }

  const handleIntegration = async (platform: 'GITHUB' | 'LINKEDIN' | 'BEHANCE') => {
    // In a real application, this would redirect to the OAuth flow
    console.log(`Connecting to ${platform}...`)
  }

  const disconnectIntegration = async (platform: 'GITHUB' | 'LINKEDIN' | 'BEHANCE') => {
    const res = await fetch(`/api/integrations/${platform}`, { method: 'DELETE' })
    if (res.ok) {
      fetchIntegrations()
    }
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">External Platform Integrations</h2>
      <ul className="space-y-4">
        {integrations.map((integration) => (
          <li key={integration.platform} className="bg-white p-4 rounded-lg shadow flex items-center justify-between">
            <div className="flex items-center">
              {integration.platform === 'GITHUB' && <GithubIcon className="mr-2" />}
              {integration.platform === 'LINKEDIN' && <LinkedinIcon className="mr-2" />}
              {integration.platform === 'BEHANCE' && <BehanceIcon className="mr-2" />}
              <span>{integration.platform}</span>
            </div>
            {integration.connected ? (
              <div>
                <span className="mr-2">{integration.username}</span>
                <Button onClick={() => disconnectIntegration(integration.platform)} variant="outline">
                  Disconnect
                </Button>
              </div>
            ) : (
              <Button onClick={() => handleIntegration(integration.platform)}>
                Connect
              </Button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

