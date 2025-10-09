"use client"

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { LogOut } from "lucide-react"

import Button from "../components/Button"
import NotificationButton from "../components/Notification"
import { useEffect, useState } from "react"
import { Notification as AppNotification } from "../types/notification"
import { AppSidebar } from "../components/SideBar"
import { signOut } from "next-auth/react"

// Simulação de API que pode retornar uma nova notificação
const fetchNotification = async (): Promise<AppNotification | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const shouldAdd = Math.random() < 0.5
      if (shouldAdd) {
        const newNotification: AppNotification = {
          id: Date.now(),
          title: "Nova notificação",
          message: "Você recebeu uma nova atualização no sistema.",
          read: false,
        }
        resolve(newNotification)
      } else {
        resolve(null)
      }
    }, 1500)
  })
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 1,
      title: "Consulta marcada",
      message: "Você tem uma consulta amanhã às 10h.",
      read: false,
    },
    {
      id: 2,
      title: "Atualização disponível",
      message: "Há uma nova versão do app disponível.",
      read: true,
    },
  ])

  const isNotification = notifications.some((n) => !n.read)

  useEffect(() => {
    const loadNotification = async () => {
      const newNotification = await fetchNotification()
      if (newNotification) {
        setNotifications((prev) => [...prev, newNotification])
      }
    }

    loadNotification()
    const interval = setInterval(loadNotification, 10000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <header className="border-b border-gray-200 flex h-16 items-center px-3 py-6">
            <div className="w-full flex items-center gap-3.5">
              <SidebarTrigger />
            </div>

            <div className="flex items-center gap-3.5">
              <NotificationButton
                isNotification={isNotification}
                notifications={notifications}
              />

              <Button
                icon={<LogOut />}
                onClick={() =>
                  signOut({
                    callbackUrl: "/signin",
                  })
                }
                className="text-white"
                variant="default"
              />
            </div>
          </header>
          {children}
        </main>
      </SidebarProvider>
    </div>
  )
}
