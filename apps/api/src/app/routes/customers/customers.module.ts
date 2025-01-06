import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/infra/prisma/prisma.module';
import { CustomerResolver } from './customers.resolver';
import { CustomerService } from './customers.service';

@Module({
  imports: [PrismaModule],
  providers: [CustomerResolver, CustomerService],
  exports: [CustomerResolver, CustomerService],
})
export class CustomerModule {}
