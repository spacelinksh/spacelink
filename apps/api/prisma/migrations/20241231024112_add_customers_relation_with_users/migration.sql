/*
  Warnings:

  - Added the required column `userAssociatedId` to the `Customers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Customers" ADD COLUMN     "userAssociatedId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Customers" ADD CONSTRAINT "Customers_userAssociatedId_fkey" FOREIGN KEY ("userAssociatedId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
