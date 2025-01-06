import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { Customer } from './models/customer.model';
import { CustomerService } from './customers.service';
import { CreateCustomerInput } from './dto/create-customer-input.dto';
import { GetCurrentUser } from 'src/app/utils/decorators/get-current-user';
import { CurrentUserType } from 'src/app/utils/types/current-user.type';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { UseGuards } from '@nestjs/common';

@Resolver(() => Customer)
export class CustomerResolver {
  constructor(private readonly customerService: CustomerService) {}

  @UseGuards(AuthGuard)
  @Query(() => [Customer], { name: 'getCustomers' })
  getAll(@GetCurrentUser() currentUser: CurrentUserType) {
    return this.customerService.getAll(currentUser.userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => Customer, { name: 'getCustomer' })
  getOne(
    @Args('id', { type: () => String }) id: string,
    @GetCurrentUser() currentUser: CurrentUserType,
  ) {
    return this.customerService.getOne(id, currentUser.userId);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Customer, { name: 'createCustomer' })
  create(
    @Args('createCustomerInput') createCustomerInput: CreateCustomerInput,
    @GetCurrentUser() currentUser: CurrentUserType,
  ) {
    return this.customerService.create(currentUser.userId, createCustomerInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Customer, { name: 'deleteCustomer' })
  delete(@Args('id', { type: () => String }) id: string) {
    return this.customerService.delete(id);
  }
}
