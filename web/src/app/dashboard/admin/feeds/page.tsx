"use client"

import { useState, useEffect, useRef } from "react" // Adicionado useRef
import { ListTable } from "@/app/components/ListTable"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { toast } from "sonner"

export default function Feeds() {
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10)
  const [totalPages, setTotalPages] = useState(0)
  const initialized = useRef(false) // Adicionado useRef para controlar a inicialização

  const getAllLeeds = async (page: number, limit: number) => {
    console.log("getAllLeeds called") // Debug log
    try {
      const res = await fetch(`/api/leeds?page=${page}&limit=${limit}`, {
        cache: "no-store",
      })
      const result = await res.json()

      if (!res.ok) {
        toast.error("Erro ao buscar leads.", {
          duration: 3000,
          position: "top-right",
          richColors: true,
          style: {
            background: "linear-gradient(90deg, #b71c1c 0%, #4a0000 100%)",
            color: "#fff",
            borderRadius: "8px",
            padding: "12px 16px",
            fontWeight: "500",
          },
          description: result.message || "Erro desconhecido",
        })
        throw new Error(
          `Erro ao buscar dados: ${res.statusText} - ${
            result.message || "Erro desconhecido"
          }`
        )
      }

      setData(result.data)
      setEmpty(result.data.length === 0)
      setTotalPages(result.totalPages)

      console.log("Calling toast.success") // Debug log
      toast.success("✅ Leads carregados com sucesso!", {
        id: "leads-loaded-success", // Adicionado um ID único para evitar duplicação
        position: "top-right",
        richColors: true,
        duration: 4000,
        style: {
          background: "linear-gradient(90deg, #000 0%, #182848 100%)",
          color: "#fff",
        },
      })
    } catch (error: any) {
      toast.error("Erro ao carregar leads.", {
        duration: 3000,
        position: "top-right",
        richColors: true,
        style: {
          background: "linear-gradient(90deg, #b71c1c 0%, #4a0000 100%)",
          color: "#fff",
          borderRadius: "8px",
          padding: "12px 16px",
          fontWeight: "500",
        },
        description: error.message,
      })
      setEmpty(true)
    }
  }

  useEffect(() => {
    console.log("useEffect called") // Debug log
    if (!initialized.current) {
      initialized.current = true
      console.log("Initializing getAllLeeds") // Debug log
      getAllLeeds(currentPage, itemsPerPage)
    }
  }, [currentPage, itemsPerPage])

  const handleAppointmentChangeInDashboard = async (
    itemId: string,
    newValue: string,
    itemData: any
  ) => {
    console.log("Mudança de agendamento detectada no Dashboard:")
    console.log("ID do Item:", itemId)
    console.log("Novo Valor:", newValue)
    console.log("Dados completos do item:", itemData)

    if (newValue === "nao") {
      try {
        const response = await fetch("/api/send-to-n8n", {
          // Você criará este endpoint no seu backend
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(itemData), // Envia todos os dados do item
        })

        if (response.ok) {
          console.log("Dados enviados com sucesso para o backend para n8n.")
          // Opcional: mostrar uma notificação de sucesso ao usuário
        } else {
          console.error("Falha ao enviar dados para o backend para n8n.")
          // Opcional: mostrar uma notificação de erro ao usuário
        }
      } catch (error) {
        console.error("Erro ao fazer requisição para o backend:", error)
        // Opcional: mostrar uma notificação de erro ao usuário
      }
    }
  }

  return (
    <div className="w-full h-full px-4 py-4">
      <div className="bg-white shadow-md rounded-md p-10">
        <h2 className="text-2xl font-bold text-gray-900">Feeds</h2>
        <p className="mt-2 text-lg text-gray-600">
          Listando todos os feeds que vieram do site
        </p>

        {/* Área da listagem dos feeds */}
        <div className="mt-4 overflow-x-auto">
          {empty ? (
            <div className="p-6 text-center text-gray-500">
              Nenhum dado encontrado.
            </div>
          ) : (
            <ListTable
              data={data}
              title="Lista de Leads"
              onAppointmentChange={handleAppointmentChangeInDashboard}
            />
          )}
        </div>

        {/* Controles de Paginação */}
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 inline-flex items-center"
          >
            <ArrowLeft className="w-4 h-4 sm:mr-2" />
            <span className="hidden sm:inline">Anterior</span>
          </Button>
          <span className="font-semibold text-gray-700">
            Página {currentPage} de {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 disabled:opacity-50 inline-flex items-center"
          >
            <span className="hidden sm:inline">Próxima</span>
            <ArrowRight className="w-4 h-4 sm:ml-2" />
          </Button>
        </div>
      </div>
    </div>
  )
}
