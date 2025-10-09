/*
  Warnings:

  - The primary key for the `Schedule` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `updatedAt` to the `Schedule` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Schedule" DROP CONSTRAINT "Schedule_pkey";
ALTER TABLE "Schedule" ADD COLUMN "updatedAt" TIMESTAMP(3);
UPDATE "Schedule" SET "updatedAt" = NOW() WHERE "updatedAt" IS NULL;
ALTER TABLE "Schedule" ALTER COLUMN "updatedAt" SET NOT NULL;
ALTER TABLE "Schedule" ALTER COLUMN "id" DROP DEFAULT;
ALTER TABLE "Schedule" ALTER COLUMN "id" SET DATA TYPE TEXT;
ALTER TABLE "Schedule" ADD CONSTRAINT "Schedule_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Schedule_id_seq";
