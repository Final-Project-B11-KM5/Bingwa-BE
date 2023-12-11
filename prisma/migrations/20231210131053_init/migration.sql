/*
  Warnings:

  - A unique constraint covering the columns `[courseId]` on the table `Enrollment` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Tracking_lessonId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Enrollment_courseId_key" ON "Enrollment"("courseId");
