import { Args, Query, Resolver, Mutation } from '@nestjs/graphql';
import { User } from './models/user.model';
import { UserService } from './users.service';
import { CreateUserInput } from './dto/create-user-input.dto';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { GetCurrentUser } from 'src/app/utils/decorators/get-current-user';
import { CurrentUserType } from 'src/app/utils/types/current-user.type';
import { Wallet } from './models/wallet.model';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Query(() => [User], { name: 'getUsers' })
  getAll() {
    return this.userService.getAll();
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'getUser' })
  getOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.getOne(id);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'getCurrentUser' })
  getCurrentUser(@GetCurrentUser() currentUser: CurrentUserType) {
    return this.userService.getCurrentUser(currentUser.userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'getUserWallet' })
  getUserWallet(@GetCurrentUser() currentUser: CurrentUserType) {
    return this.userService.getUserWallet(currentUser.userId);
  }

  @UseGuards(AuthGuard)
  @Query(() => User, { name: 'getUserByEmail' })
  getUserByEmail(@Args('email', { type: () => String }) email: string) {
    return this.userService.getByEmail(email);
  }

  @Mutation(() => User, { name: 'createUser' })
  create(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @UseGuards(AuthGuard)
  @Mutation(() => Wallet, { name: 'withdrawBalance' })
  withdrawBalance(
    @GetCurrentUser() currentUser: CurrentUserType,
    @Args('withdrawValue', { type: () => Number }) withdrawValue: number,
    @Args('financialAccountId', { type: () => String })
    financialAccountId: string,
  ) {
    return this.userService.withdrawBalance(
      withdrawValue,
      currentUser.userId,
      financialAccountId,
    );
  }
}
