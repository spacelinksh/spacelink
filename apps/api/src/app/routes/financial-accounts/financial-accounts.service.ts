import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateFinancialAccountInput } from './dto/create-financial-account-input.dto';

@Injectable()
export class FinancialAccountService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(userId: string) {
    return this.prisma.financialAccount.findMany({
      where: { id: userId },
    });
  }

  getOne(id: string) {
    return this.prisma.financialAccount.findUnique({
      where: { id },
    });
  }

  create(
    userId: string,
    createFinancialAccountInput: CreateFinancialAccountInput,
  ) {
    const { account, agency, bankHolder, transferKey } =
      createFinancialAccountInput;

    const createFinancialAccount = this.prisma.financialAccount.create({
      data: {
        account,
        agency,
        bankHolder,
        transferKey,
        users: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return createFinancialAccount;
  }

  delete(id: string) {
    return this.prisma.financialAccount.delete({
      where: { id },
    });
  }
}
