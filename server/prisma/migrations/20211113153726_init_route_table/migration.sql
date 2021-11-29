/*
  Warnings:

  - The primary key for the `Coach` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Coach` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[phonenumber]` on the table `Coach` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[plates]` on the table `Coach` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Coach" DROP CONSTRAINT "Coach_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Coach_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Route" (
    "id" SERIAL NOT NULL,
    "starting" TEXT,
    "destination" TEXT,
    "departure" TIMESTAMP(3) NOT NULL,
    "price" INTEGER,
    "coachId" INTEGER,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_coachId_key" ON "Route"("coachId");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_phonenumber_key" ON "Coach"("phonenumber");

-- CreateIndex
CREATE UNIQUE INDEX "Coach_plates_key" ON "Coach"("plates");

-- AddForeignKey
ALTER TABLE "Route" ADD CONSTRAINT "Route_coachId_fkey" FOREIGN KEY ("coachId") REFERENCES "Coach"("id") ON DELETE SET NULL ON UPDATE CASCADE;
