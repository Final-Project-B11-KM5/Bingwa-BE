/*
  Warnings:

  - You are about to drop the column `trackingId` on the `Enrollment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[lessonId]` on the table `Tracking` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Enrollment" DROP COLUMN "trackingId";

-- AlterTable
ALTER TABLE "Lesson" ADD COLUMN     "courseId" INTEGER;

-- CreateIndex
CREATE UNIQUE INDEX "Tracking_lessonId_key" ON "Tracking"("lessonId");

-- AddForeignKey
ALTER TABLE "Lesson" ADD CONSTRAINT "Lesson_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
