/*
  Warnings:

  - You are about to drop the column `vidioName` on the `Vidio` table. All the data in the column will be lost.
  - Added the required column `title` to the `Vidio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Vidio" DROP COLUMN "vidioName",
ADD COLUMN     "title" TEXT NOT NULL;
