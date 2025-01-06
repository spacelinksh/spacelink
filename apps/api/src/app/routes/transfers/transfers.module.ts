import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { TransfersService } from './transfers.service';
import { TransferResolver } from './transfers.resolver';

@Module({
  imports: [PrismaModule],
  providers: [TransfersService, TransferResolver],
  exports: [TransfersService, TransferResolver],
})
export class TransferModule {}
