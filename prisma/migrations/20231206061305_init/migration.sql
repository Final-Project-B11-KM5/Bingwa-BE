/*
  Warnings:

  - You are about to drop the column `paymentId` on the `Enrollment` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Enrollment" DROP CONSTRAINT "Enrollment_paymentId_fkey";

-- DropIndex
DROP INDEX "Enrollment_paymentId_key";

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "paymentId";
