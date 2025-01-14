'use client'

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function SettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [settings, setSettings] = useState({
    emailNotifications: true,
    profileVisibility: "PUBLIC",
  })

  useEffect(() => {
    const fetchSettings = async () => {
      const res = await fetch("/api/user/settings")
      if (res.ok) {
        const data = await res.json()
        setSettings(data)
      }
    }

    if (session) {
      fetchSettings()
    }
  }, [session])

  const handleSettingsChange = async () => {
    const res = await fetch("/api/user/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    })

    if (res.ok) {
      // Show success message or update UI
    }
  }

  return (
    <div className="min-h-screen bg-[#FDF8F7] py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-[#4A2515] mb-6">User Settings</h1>
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <Label htmlFor="email-notifications" className="text-[#4A2515]">
                Email Notifications
              </Label>
              <Switch
                id="email-notifications"
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings({ ...settings, emailNotifications: checked })}
              />
            </div>
            <div>
              <Label className="text-[#4A2515] mb-2 block">Profile Visibility</Label>
              <RadioGroup
                value={settings.profileVisibility}
                onValueChange={(value) => setSettings({ ...settings, profileVisibility: value })}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PUBLIC" id="public" />
                  <Label htmlFor="public">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="PRIVATE" id="private" />
                  <Label htmlFor="private">Private</Label>
                </div>
              </RadioGroup>
            </div>
            <Button 
              onClick={handleSettingsChange}
              className="w-full bg-[#B85C3C] hover:bg-[#A34E32]"
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

