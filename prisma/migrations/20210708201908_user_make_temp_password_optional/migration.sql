-- AlterTable
ALTER TABLE "User" ALTER COLUMN "tempPassword" DROP NOT NULL,
ALTER COLUMN "tempPasswordExpires" DROP NOT NULL;
