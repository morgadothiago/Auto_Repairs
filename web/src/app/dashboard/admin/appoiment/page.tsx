"use client"

import { useAuth } from "@/app/context/AuthContext"
import { get } from "http"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function appoiment() {
  const { user, isAuthenticated } = useAuth()
  const router = useRouter()
  const [appointments, setAppointments] = useState([])

  const getAppointments = async () => {
    try {
      const response = await fetch(`/api/appointments`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Erro ao buscar agendamentos")
      }

      const data = await response.json()

      console.log(appointments)

      setAppointments(data)

      console.log("dados, do meu data", data)

      return data
    } catch (error) {
      console.log(error)
    }
  }

  getAppointments()

  return (
    <div>
      <h1>TEla do agendamento</h1>

      <p>Bem-vindo, {user?.name}!</p>

      <ListTable />
    </div>
  )
}
