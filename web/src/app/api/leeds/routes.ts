import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "10", 10)

    const skip = (page - 1) * limit

    const [leeads, totalCount] = await prisma.$transaction([
      prisma.leeads.findMany({
        skip: skip,
        take: limit,
      }),
      prisma.leeads.count(),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      data: leeads,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    })
  } catch (error: any) {
    console.error("Erro ao buscar leads:", error)
    return NextResponse.json(
      { success: false, message: error.message, error: error },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, model, plate, year, serviceType, date } = body

    // validação simples
    if (
      !name ||
      !phone ||
      !email ||
      !model ||
      !plate ||
      !year ||
      !serviceType ||
      !date
    ) {
      return NextResponse.json(
        { success: false, message: "Campos obrigatórios faltando." },
        { status: 400 }
      )
    }

    // converte types para o que o Prisma espera
    const appointment = await prisma.leeads.create({
      data: {
        name,
        phone,
        email,
        model,
        plate,
        year: Number(year),
        serviceType,
        date: new Date(date),
      },
    })

    return NextResponse.json({ success: true, data: appointment })
  } catch (error: any) {
    console.error("Erro ao criar agendamento:", error)
    return NextResponse.json(
      { success: false, message: error.message, error: error },
      { status: 500 }
    )
  }
}
