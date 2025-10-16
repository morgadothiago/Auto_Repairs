"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import LoadingScreen from "./LoadingScreen"

export default function AuthRedirector({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()
  const [showLoading, setShowLoading] = useState(true)

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/") {
      router.replace("/signin")
    }
  }, [status, router, pathname])

  useEffect(() => {
    if (status === "loading") {
      setShowLoading(true)
    } else {
      const timer = setTimeout(() => {
        setShowLoading(false)
      }, 1000) // Atraso de 1 segundo (1000 ms)
      return () => clearTimeout(timer)
    }
  }, [status])

  if (status === "loading" || showLoading) {
    return <LoadingScreen isLoading={true} />
  }

  return <>{children}</>
}
