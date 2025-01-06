import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { FinancialAccountService } from './financial-accounts.service';
import { FinancialAccountResolver } from './financial-accounts.resolver';

@Module({
  imports: [PrismaModule],
  providers: [FinancialAccountService, FinancialAccountResolver],
  exports: [FinancialAccountService, FinancialAccountResolver],
})
export class FinancialAccountModule {}
