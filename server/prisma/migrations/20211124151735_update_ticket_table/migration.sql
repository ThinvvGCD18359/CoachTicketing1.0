/*
  Warnings:

  - The `seat` column on the `Ticket` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Ticket" DROP COLUMN "seat",
ADD COLUMN     "seat" TEXT[];
