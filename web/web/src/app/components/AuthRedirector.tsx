"use client"

import { useSession } from "next-auth/react"
import { useRouter, usePathname } from "next/navigation"
import { useEffect } from "react"
import LoadingScreen from "./LoadingScreen"

export default function AuthRedirector({
  children,
}: {
  children: React.ReactNode
}) {
  const { data: session, status } = useSession()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (status === "unauthenticated" && pathname !== "/") {
      router.replace("/signin")
    }
  }, [status, router, pathname])

  if (status === "loading") {
    return <LoadingScreen isLoading={status === "loading"} />
  }

  return <>{children}</>
}
