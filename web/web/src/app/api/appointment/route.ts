import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

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
    const appointment = await prisma.schedule.create({
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
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
