"use client"

import * as React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Phone } from "lucide-react"

type TableData = {
  id: string
  name: string
  phone: string
  email: string
  model: string
  plate: string
  year: number
  serviceType: string
  date: string | Date
}

interface DynamicTableProps {
  data: TableData[]
  title?: string
}

export function ListTable({ data, title }: DynamicTableProps) {
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        Nenhum dado encontrado.
      </div>
    )
  }

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, "") // remove caracteres não numéricos
  }

  const openWhatsApp = (phone: string) => {
    const cleanNumber = formatPhoneNumber(phone)
    const url = `https://wa.me/55${cleanNumber}`
    window.open(url, "_blank")
  }

  return (
    <div className="w-full rounded-lg border  shadow-sm">
      {title && (
        <div className="bg-gray-100 px-4 py-3 ">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}

      <Table>
        <TableCaption>
          {title ? `${title} - Total: ${data.length}` : `${data.length} itens`}
        </TableCaption>

        <TableHeader className="hidden sm:table-header-group">
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Telefone</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Modelo</TableHead>
            <TableHead>Placa</TableHead>
            <TableHead>Ano</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Data</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((item, index) => (
            <TableRow
              key={item.id}
              className="flex flex-col sm:table-row mb-4 sm:mb-0 rounded-lg shadow-sm bg-white"
            >
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Nome:</span>
                  <span className="text-base text-gray-900">
                    {item.name}
                  </span>
                </div>
                <span className="hidden sm:inline">{item.name}</span>
              </TableCell>
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Telefone:</span>
                  <span className="text-base text-gray-900">
                    {item.phone}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:justify-start hidden sm:flex">
                  <span className="hidden sm:inline">{item.phone}</span>
                  <Button
                    size="icon"
                    variant="outline"
                    className="h-8 w-8"
                    onClick={() => openWhatsApp(item.phone)}
                  >
                    <Phone className="h-4 w-4 text-green-600" />
                  </Button>
                </div>
              </TableCell>
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Email:</span>
                  <span className="text-base text-gray-900">
                    {item.email}
                  </span>
                </div>
                <span className="hidden sm:inline">{item.email}</span>
              </TableCell>
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Modelo:</span>
                  <span className="text-base text-gray-900">
                    {item.model}
                  </span>
                </div>
                <span className="hidden sm:inline">{item.model}</span>
              </TableCell>
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Placa:</span>
                  <span className="text-base text-gray-900">
                    {item.plate}
                  </span>
                </div>
                <span className="hidden sm:inline">{item.plate}</span>
              </TableCell>
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Ano:</span>
                  <span className="text-base text-gray-900">
                    {item.year}
                  </span>
                </div>
                <span className="hidden sm:inline">{item.year}</span>
              </TableCell>
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Serviço:</span>
                  <span className="text-base text-gray-900">
                    {item.serviceType}
                  </span>
                </div>
                <span className="hidden sm:inline">{item.serviceType}</span>
              </TableCell>
              <TableCell className="p-3 sm:p-4">
                <div className="flex flex-col gap-y-2 sm:hidden">
                  <span className="font-semibold text-sm text-gray-700">Data:</span>
                  <span className="text-base text-gray-900">
                    {new Date(item.date).toLocaleDateString("pt-BR")}
                  </span>
                </div>
                <span className="hidden sm:inline">
                  {new Date(item.date).toLocaleDateString("pt-BR")}
                </span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
