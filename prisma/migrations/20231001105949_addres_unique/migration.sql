/*
  Warnings:

  - The primary key for the `Review` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Review` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Toilet` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Toilet` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[country,city,street,streetNumber]` on the table `Address` will be added. If there are existing duplicate values, this will fail.
  - Changed the type of `toiletId` on the `Address` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `toiletId` on the `Review` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Address" DROP CONSTRAINT "Address_toiletId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_toiletId_fkey";

-- AlterTable
ALTER TABLE "Address" DROP COLUMN "toiletId",
ADD COLUMN     "toiletId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP CONSTRAINT "Review_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "toiletId",
ADD COLUMN     "toiletId" INTEGER NOT NULL,
ADD CONSTRAINT "Review_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Toilet" DROP CONSTRAINT "Toilet_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Toilet_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "Address_toiletId_key" ON "Address"("toiletId");

-- CreateIndex
CREATE UNIQUE INDEX "Address_country_city_street_streetNumber_key" ON "Address"("country", "city", "street", "streetNumber");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "Toilet"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "Toilet"("id") ON DELETE CASCADE ON UPDATE CASCADE;
