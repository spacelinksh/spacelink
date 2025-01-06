import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class TransfersService {
  constructor(private readonly prisma: PrismaService) {}

  getAll(userId: string) {
    return this.prisma.transfers.findMany({
      where: { userId },
    });
  }

  getOne(id: string) {
    return this.prisma.transfers.findUnique({
      where: { id },
    });
  }

  async cancelTransfer(userId: string, transferId: string) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        wallet: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const transfer = await this.prisma.transfers.findUnique({
      where: { id: transferId },
    });

    if (!transfer) {
      throw new Error('Transfer not found');
    }

    const resolveNewBalance = user.wallet.balance + transfer.transferValue;

    const withdrawBalance = await this.prisma.$transaction(async (prisma) => {
      await prisma.transfers.update({
        where: { id: transfer.id },
        data: {},
      });

      const updateWallet = prisma.wallets.update({
        where: { id: user.wallet.id },
        data: {
          balance: resolveNewBalance,
        },
      });

      return updateWallet;
    });

    return withdrawBalance;
  }
}
