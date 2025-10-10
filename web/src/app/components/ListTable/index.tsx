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
    <div className="w-full rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      {title && (
        <div className="bg-gray-100 px-4 py-3 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        </div>
      )}

      <Table>
        <TableCaption>
          {title ? `${title} - Total: ${data.length}` : `${data.length} itens`}
        </TableCaption>

        <TableHeader>
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
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{item.phone}</span>
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
              <TableCell>{item.email}</TableCell>
              <TableCell>{item.model}</TableCell>
              <TableCell>{item.plate}</TableCell>
              <TableCell>{item.year}</TableCell>
              <TableCell>{item.serviceType}</TableCell>
              <TableCell>
                {new Date(item.date).toLocaleDateString("pt-BR")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
