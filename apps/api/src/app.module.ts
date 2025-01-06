import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { GqlConfigService } from './config/graphql.config';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './app/routes/users/users.module';
import { AuthModule } from './app/auth/auth.module';
import { CustomerModule } from './app/routes/customers/customers.module';
import { FinancialAccountModule } from './app/routes/financial-accounts/financial-accounts.module';
import { TransferModule } from './app/routes/transfers/transfers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useClass: GqlConfigService,
    }),
    AuthModule,
    UserModule,
    CustomerModule,
    FinancialAccountModule,
    TransferModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
