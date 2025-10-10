"use client"

import { useState, useEffect } from "react"
import { ListTable } from "@/app/components/ListTable"

export default function Feeds() {
  const [data, setData] = useState([])
  const [empty, setEmpty] = useState(false)
  const [currentPage, setCurrentPage] = useState(1)
  const [itemsPerPage] = useState(10) // Definindo 10 itens por página
  const [totalPages, setTotalPages] = useState(0)

  const getAllLeeds = async (page: number, limit: number) => {
    try {
      const res = await fetch(`/api/appointment?page=${page}&limit=${limit}`, {
        cache: "no-store",
      })
      const result = await res.json() // Lê o corpo da resposta uma única vez

      if (!res.ok) {
        // Se a resposta não for OK, result conterá a mensagem de erro da API
        throw new Error(
          `Erro ao buscar dados: ${res.statusText} - ${
            result.message || "Erro desconhecido"
          }`
        )

        // colocar toast de erro
      }

      console.log("Leads carregados:", result.data)

      // colocar toast de acerto

      setData(result.data)
      setEmpty(result.data.length === 0)
      setTotalPages(result.totalPages)
    } catch (error: any) {
      console.error("Erro ao carregar leads:", error)
      setEmpty(true)
      // colocar toast de erro
    }
  }

  useEffect(() => {
    getAllLeeds(currentPage, itemsPerPage)
  }, [currentPage, itemsPerPage])

  return (
    <div className="w-full h-full px-4 py-4">
      <div className="bg-white shadow-md rounded-md p-10">
        <h2 className="text-2xl font-bold text-gray-900">Feeds</h2>
        <p className="mt-2 text-lg text-gray-600">
          Listando todos os feeds que vieram do site
        </p>

        {/* Área da listagem dos feeds */}
        <div className="mt-4">
          {empty ? (
            <div className="p-6 text-center text-gray-500">
              Nenhum dado encontrado.
            </div>
          ) : (
            <ListTable data={data} title="Lista de Leads" />
          )}
        </div>

        {/* Controles de Paginação */}
        <div className="flex justify-between items-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Anterior
          </button>
          <span>
            Página {currentPage} de {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
          >
            Próxima
          </button>
        </div>
      </div>
    </div>
  )
}
