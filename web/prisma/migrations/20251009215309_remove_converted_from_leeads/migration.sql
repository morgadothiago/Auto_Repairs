-- AlterTable
ALTER TABLE "Appointments" ADD COLUMN     "leadId" TEXT;

-- AddForeignKey
ALTER TABLE "Appointments" ADD CONSTRAINT "Appointments_leadId_fkey" FOREIGN KEY ("leadId") REFERENCES "Leeads"("id") ON DELETE SET NULL ON UPDATE CASCADE;
