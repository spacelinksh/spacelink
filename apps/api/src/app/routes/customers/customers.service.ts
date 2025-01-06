import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateCustomerInput } from './dto/create-customer-input.dto';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(userId: string) {
    return this.prisma.customers.findMany({
      where: { userAssociatedId: userId },
    });
  }

  getOne(id: string, userId: string) {
    return this.prisma.customers.findUnique({
      where: { id, userAssociatedId: userId },
    });
  }

  async create(userId: string, createCustomerInput: CreateCustomerInput) {
    const { name, email, phone, document } = createCustomerInput;

    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        wallet: true,
      },
    });

    if (!user) {
      throw new Error('Error when creating customer');
    }

    const resolveBalance = user.wallet.balance + 50;

    const createCustomer = this.prisma.$transaction(async (prisma) => {
      await prisma.wallets.update({
        where: { id: user.wallet.id },
        data: {
          balance: resolveBalance,
        },
      });

      return this.prisma.customers.create({
        data: {
          name,
          email,
          phone,
          document,
          userAssociated: {
            connect: {
              id: userId,
            },
          },
        },
      });
    });

    return createCustomer;
  }

  delete(id: string) {
    return this.prisma.customers.delete({
      where: { id },
    });
  }
}
