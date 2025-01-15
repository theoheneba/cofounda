import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from "@/components/ui/use-toast"

type Notification = {
  id: string
  message: string
  type: 'info' | 'success' | 'warning' | 'error'
}

type NotificationContextType = {
  notifications: Notification[]
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined)

export const useNotification = () => {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider')
  }
  return context
}

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const addNotification = (notification: Omit<Notification, 'id'>) => {
    const id = Date.now().toString()
    setNotifications(prev => [...prev, { ...notification, id }])
    toast({
      title: notification.type.charAt(0).toUpperCase() + notification.type.slice(1),
      description: notification.message,
      variant: notification.type === 'error' ? 'destructive' : 'default',
    })
  }

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id))
  }

  useEffect(() => {
    // Here you would typically set up a WebSocket connection or SSE
    // to receive real-time notifications from the server
    // For this example, we'll just simulate a notification every 10 seconds
    const interval = setInterval(() => {
      addNotification({
        message: 'This is a simulated real-time notification',
        type: 'info',
      })
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <NotificationContext.Provider value={{ notifications, addNotification, removeNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

