import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { FinancialAccount } from './models/financial-account.model';
import { FinancialAccountService } from './financial-accounts.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { GetCurrentUser } from 'src/app/utils/decorators/get-current-user';
import { CurrentUserType } from 'src/app/utils/types/current-user.type';
import { CreateFinancialAccountInput } from './dto/create-financial-account-input.dto';

@Resolver(() => FinancialAccount)
export class FinancialAccountResolver {
  constructor(
    private readonly financialAccountService: FinancialAccountService,
  ) {}

  @UseGuards(AuthGuard)
  @Query(() => [FinancialAccount], { name: 'getFinancialAccounts' })
  getAll(@GetCurrentUser() currentUser: CurrentUserType) {
    return this.financialAccountService.getAll(currentUser.userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => FinancialAccount, { name: 'getFinancialAccount' })
  getOne(@Args('id', { type: () => String }) id: string) {
    return this.financialAccountService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => FinancialAccount, { name: 'createFinancialAccount' })
  create(
    @Args('createCustomerInput')
    createFinancialAccount: CreateFinancialAccountInput,
    @GetCurrentUser() currentUser: CurrentUserType,
  ) {
    return this.financialAccountService.create(
      currentUser.userId,
      createFinancialAccount,
    );
  }

  @UseGuards(AuthGuard)
  @Query(() => FinancialAccount, { name: 'deleteFinancialAccount' })
  delete(@Args('id', { type: () => String }) id: string) {
    return this.financialAccountService.delete(id);
  }
}
