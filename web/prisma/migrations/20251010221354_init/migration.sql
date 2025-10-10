-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "adminId" TEXT;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
