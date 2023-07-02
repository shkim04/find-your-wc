/*
  Warnings:

  - Made the column `toiletId` on table `Address` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_toiletId_fkey";

-- AlterTable
ALTER TABLE "Address" ALTER COLUMN "toiletId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "Toilet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
