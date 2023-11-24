/*
  Warnings:

  - You are about to drop the column `Price` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `Rating` on the `Course` table. All the data in the column will be lost.
  - Added the required column `price` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Course" DROP COLUMN "Price",
DROP COLUMN "Rating",
ADD COLUMN     "price" INTEGER NOT NULL,
ADD COLUMN     "rating" INTEGER NOT NULL;
