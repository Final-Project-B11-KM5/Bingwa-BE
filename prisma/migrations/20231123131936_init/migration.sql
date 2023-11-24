-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "categoryName" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" SERIAL NOT NULL,
    "courseName" TEXT NOT NULL,
    "Price" INTEGER NOT NULL,
    "Rating" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "aboutCourse" TEXT NOT NULL,
    "targetAudience" TEXT NOT NULL,
    "learningMaterial" TEXT NOT NULL,
    "creator" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "linkVidio" TEXT NOT NULL,
    "linkForum" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "release" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoryId" INTEGER,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LevelKelas" (
    "id" SERIAL NOT NULL,
    "level" TEXT NOT NULL,

    CONSTRAINT "LevelKelas_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_categoryName_key" ON "Category"("categoryName");

-- CreateIndex
CREATE UNIQUE INDEX "LevelKelas_level_key" ON "LevelKelas"("level");

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
