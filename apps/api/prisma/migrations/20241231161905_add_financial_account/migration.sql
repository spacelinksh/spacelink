-- CreateEnum
CREATE TYPE "TransferKeyType" AS ENUM ('CPF', 'EMAIL', 'ALL', 'PHONE');

-- CreateTable
CREATE TABLE "FinancialAccount" (
    "id" TEXT NOT NULL,
    "account" TEXT NOT NULL,
    "agency" TEXT NOT NULL,
    "bankHolder" TEXT,
    "transferKey" TEXT NOT NULL,
    "transferKeyType" "TransferKeyType" NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinancialAccount_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "FinancialAccount_account_key" ON "FinancialAccount"("account");

-- CreateIndex
CREATE UNIQUE INDEX "FinancialAccount_transferKey_key" ON "FinancialAccount"("transferKey");

-- AddForeignKey
ALTER TABLE "FinancialAccount" ADD CONSTRAINT "FinancialAccount_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
