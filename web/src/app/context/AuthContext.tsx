"use client"

import React, { createContext, useContext } from "react"
import { useSession, signIn, signOut } from "next-auth/react"

interface User {
  id: string
  name?: string | null
  email?: string | null
  role?: string | null
  // adicione mais campos se quiser
}

interface AuthContextType {
  isAuthenticated: boolean
  isLoading: boolean
  user: User | null
  signIn: typeof signIn
  signOut: typeof signOut
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const isLoading = status === "loading"
  const isAuthenticated = !!session?.user

  const user = session?.user || null

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, isLoading, user, signIn, signOut }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
