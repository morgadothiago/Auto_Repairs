/*
  Warnings:

  - Made the column `updatedAt` on table `Schedule` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Schedule" ALTER COLUMN "updatedAt" SET NOT NULL;
