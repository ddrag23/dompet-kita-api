/*
  Warnings:

  - Added the required column `nominal` to the `Transaction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Transaction" ADD COLUMN     "description" TEXT,
ADD COLUMN     "nominal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
