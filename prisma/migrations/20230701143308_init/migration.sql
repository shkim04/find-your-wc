-- CreateTable
CREATE TABLE "Toilet" (
    "id" TEXT NOT NULL,
    "isPaid" BOOLEAN NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "Toilet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Address" (
    "id" TEXT NOT NULL,
    "streetNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "toiletId" TEXT,

    CONSTRAINT "Address_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL,
    "cleanliness" DOUBLE PRECISION NOT NULL,
    "performance" DOUBLE PRECISION NOT NULL,
    "description" VARCHAR(1024),
    "contributedBy" TEXT NOT NULL,
    "toiletId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Review_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Address_toiletId_key" ON "Address"("toiletId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_contributedBy_key" ON "Review"("contributedBy");

-- AddForeignKey
ALTER TABLE "Address" ADD CONSTRAINT "Address_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "Toilet"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_toiletId_fkey" FOREIGN KEY ("toiletId") REFERENCES "Toilet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
