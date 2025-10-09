"use client"

import { useAuth } from "@/app/context/AuthContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function Dashboard() {
  const { isAuthenticated, isLoading, user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace("/signin")
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return <p>Carregando...</p> // ou pode retornar null para nada renderizar
  }

  if (!isAuthenticated) {
    return null // não renderiza nada até redirecionar
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Bem-vindo, {user?.name}!</p>
    </div>
  )
}
