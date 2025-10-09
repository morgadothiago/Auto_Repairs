// app/providers.tsx
"use client"

import { SessionProvider } from "next-auth/react"
import { AuthProvider } from "../context/AuthContext"
import AuthRedirector from "../components/AuthRedirector"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProvider>
        <AuthRedirector>{children}</AuthRedirector>
      </AuthProvider>
    </SessionProvider>
  )
}
