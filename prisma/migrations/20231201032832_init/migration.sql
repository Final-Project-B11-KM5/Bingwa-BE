/*
  Warnings:

  - Made the column `startDate` on table `Promotion` required. This step will fail if there are existing NULL values in that column.
  - Made the column `endDate` on table `Promotion` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "startDate" SET NOT NULL,
ALTER COLUMN "startDate" SET DATA TYPE TEXT,
ALTER COLUMN "endDate" SET NOT NULL,
ALTER COLUMN "endDate" SET DATA TYPE TEXT;
