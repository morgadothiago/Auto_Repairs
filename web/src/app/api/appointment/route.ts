import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") || "1", 10)
    const limit = parseInt(searchParams.get("limit") || "10", 10)

    const skip = (page - 1) * limit

    const [appointments, totalCount] = await prisma.$transaction([
      prisma.appointments.findMany({
        skip: skip,
        take: limit,
      }),
      prisma.appointments.count(),
    ])

    const totalPages = Math.ceil(totalCount / limit)

    return NextResponse.json({
      data: appointments,
      totalPages,
      currentPage: page,
      itemsPerPage: limit,
    })
  } catch (error: any) {
    console.error("Erro ao buscar agendamentos:", error)
    return NextResponse.json(
      { success: false, message: error.message, error: error },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, phone, email, model, plate, year, serviceType, date, userId, leadId } = body

    let actualUserId = userId;
    // TEMPORARY: Using a placeholder userId for debugging. REPLACE THIS with a real user ID from your session or authentication system.
    if (!actualUserId) {
      // You MUST replace this with an actual existing User.id from your database.
      // Example: actualUserId = "clx0000000000000000000000"; 
      console.warn("Using placeholder userId for appointment creation. This should be replaced with a real user ID from session.");
      return NextResponse.json(
        { success: false, message: "userId é obrigatório e não foi fornecido." },
        { status: 400 }
      );
    }

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

    // converte year para número e valida data
    const convertedYear = Number(year);
    if (isNaN(convertedYear)) {
      return NextResponse.json(
        { success: false, message: "O ano fornecido não é um número válido." },
        { status: 400 }
      );
    }

    const convertedDate = new Date(date);
    if (isNaN(convertedDate.getTime())) {
      return NextResponse.json(
        { success: false, message: "A data fornecida não é uma data válida." },
        { status: 400 }
      );
    }

    // Verifica se já existe um agendamento para este lead
    const existingAppointment = await prisma.appointments.findFirst({
      where: {
        leadId: leadId,
      },
    });

    if (existingAppointment) {
      return NextResponse.json(
        { success: false, message: "Já existe um agendamento para este lead." },
        { status: 409 } // 409 Conflict
      );
    }

    const appointment = await prisma.appointments.create({
      data: {
        name,
        phone,
        email,
        model,
        plate,
        year: convertedYear,
        serviceType,
        date: convertedDate, // Converte a string da data para um objeto Date
        userId: actualUserId,
        leadId: leadId, // Vincula o agendamento ao lead
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

export async function PUT(request: Request) {
  try {
    const body = await request.json();
    const { id, appointment } = body;

    if (!id || !appointment) {
      return NextResponse.json(
        { success: false, message: "ID do agendamento e status são obrigatórios." },
        { status: 400 }
      );
    }

    const updatedAppointment = await prisma.appointments.update({
      where: { id: id },
      data: appointment,
    });

    return NextResponse.json({ success: true, data: updatedAppointment });
  } catch (error: any) {
    console.error("Erro ao atualizar agendamento:", error);
    return NextResponse.json(
      { success: false, message: error.message, error: error },
      { status: 500 }
    );
  }
}
