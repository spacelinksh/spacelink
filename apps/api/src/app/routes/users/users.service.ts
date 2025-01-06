import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreateUserInput } from './dto/create-user-input.dto';
import * as bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  getAll() {
    return this.prisma.users.findMany({
      include: {
        wallet: true,
      },
    });
  }

  getOne(id: string) {
    return this.prisma.users.findUnique({
      where: { id },
      include: {
        wallet: true,
      },
    });
  }

  getByEmail(email: string) {
    return this.prisma.users.findUnique({
      where: { email },
      include: {
        wallet: true,
      },
    });
  }

  getCurrentUser(userId: string) {
    const getCurrentUser = this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        wallet: true,
      },
    });

    return getCurrentUser;
  }

  getUserWallet(userId: string) {
    return this.prisma.users.findUnique({
      where: { id: userId },
      select: {
        wallet: true,
      },
    });
  }

  async create(createUserInput: CreateUserInput) {
    const { name, email, phone, password, document } = createUserInput;

    const hashPassword = await bcrypt.hash(password, 10);

    return this.prisma.users.create({
      data: {
        name,
        email,
        phone,
        password: hashPassword,
        document,
        wallet: {
          create: {
            balance: 0,
            isActive: true,
          },
        },
      },
    });
  }

  generateTransferToken(length: number = 8): string {
    const token = randomBytes(length)
      .toString('base64')
      .replace(/[^a-zA-Z0-9]/g, '')
      .slice(0, length);

    return token.toUpperCase();
  }

  async withdrawBalance(
    withdrawValue: number,
    userId: string,
    financialAccountId: string,
  ) {
    const user = await this.prisma.users.findUnique({
      where: { id: userId },
      include: {
        wallet: true,
      },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const wallet = await this.prisma.wallets.findUnique({
      where: { id: user.walletId },
    });

    if (!user) {
      throw new Error('Wallet not found');
    }

    const resolveNewBalance = wallet.balance - withdrawValue;
    const transferToken = this.generateTransferToken();

    const withdrawBalance = await this.prisma.$transaction(async (prisma) => {
      await prisma.transfers.create({
        data: {
          token: transferToken,
          transferValue: withdrawValue,
          user: {
            connect: {
              id: userId,
            },
          },
          financialAccount: {
            connect: {
              id: financialAccountId,
            },
          },
        },
      });

      const updateWallet = prisma.wallets.update({
        where: { id: wallet.id },
        data: {
          balance: resolveNewBalance,
        },
      });

      return updateWallet;
    });

    return withdrawBalance;
  }
}
