-- CreateTable
CREATE TABLE "_UserToCourse" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserToCourse_AB_unique" ON "_UserToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_UserToCourse_B_index" ON "_UserToCourse"("B");

-- AddForeignKey
ALTER TABLE "_UserToCourse" ADD CONSTRAINT "_UserToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "Course"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserToCourse" ADD CONSTRAINT "_UserToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
