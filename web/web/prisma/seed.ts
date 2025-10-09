import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const hashedPassword = await bcrypt.hash("123456", 10)

  const user = await prisma.user.create({
    data: {
      name: "Administrador",
      email: "admin@mysaas.com",
      password: hashedPassword,
      role: "ADMIN",
    },
  })

  console.log("✅ Usuário criado:", user)
}

main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    prisma.$disconnect()
    process.exit(1)
  })
