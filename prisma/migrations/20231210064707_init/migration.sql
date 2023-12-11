-- AlterTable
ALTER TABLE "Tracking" ADD COLUMN     "courseId" INTEGER;

-- AddForeignKey
ALTER TABLE "Tracking" ADD CONSTRAINT "Tracking_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE SET NULL ON UPDATE CASCADE;
