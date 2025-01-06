import { Module } from '@nestjs/common';

import { PrismaModule } from 'src/infra/prisma/prisma.module';

import { UserService } from './users.service';
import { UserResolver } from './users.resolver';

@Module({
  imports: [PrismaModule],
  providers: [UserService, UserResolver],
  exports: [UserService, UserResolver],
})
export class UserModule {}
