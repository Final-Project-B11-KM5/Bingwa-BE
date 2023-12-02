/*
  Warnings:

  - You are about to drop the column `rating` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `isPaid` on the `Enrollment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "rating",
ADD COLUMN     "averageRating" DECIMAL(65,30);

-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "isPaid",
ADD COLUMN     "userRating" INTEGER;
