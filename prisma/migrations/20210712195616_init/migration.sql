-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'CONFIRMING', 'COMPLETE');

-- CreateEnum
CREATE TYPE "OrderType" AS ENUM ('ADD__ON', 'BACK_ORDER', 'DELIVERY', 'PICK_UP_AND_COUNT', 'PRICE_QUOTE', 'SPECIAL', 'WILL_CALL');

-- CreateEnum
CREATE TYPE "CreditApproval" AS ENUM ('REGULAR', 'ACH', 'CHECK_FOR_MONEY', 'HOLD', 'CHECK_ON_DELIVERY');

-- CreateEnum
CREATE TYPE "AdditionalChannels" AS ENUM ('MESH_THREAD');

-- CreateEnum
CREATE TYPE "ConfirmationMethod" AS ENUM ('EMAIL', 'FAX');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "tempCode" TEXT,
    "tempCodeExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,
    "settings" JSONB NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "createdOn" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "creatorId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,
    "id" SERIAL NOT NULL,
    "history" JSONB NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "notes" TEXT,
    "orderNumber" INTEGER NOT NULL,
    "orderStatus" "OrderStatus" NOT NULL,
    "orderType" "OrderType" NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "site" TEXT,
    "PONumber" TEXT,

    PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User.email_unique" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("creatorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
