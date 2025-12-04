/*
  Warnings:

  - A unique constraint covering the columns `[toiletId,contributedBy]` on the table `Review` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."Review_contributedBy_key";

-- CreateIndex
CREATE UNIQUE INDEX "Review_toiletId_contributedBy_key" ON "Review"("toiletId", "contributedBy");
