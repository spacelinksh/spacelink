import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { TransfersService } from './transfers.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/app/auth/auth.guard';
import { GetCurrentUser } from 'src/app/utils/decorators/get-current-user';
import { CurrentUserType } from 'src/app/utils/types/current-user.type';
import { Transfer } from './models/transfer.model';

@Resolver(() => Transfer)
export class TransferResolver {
  constructor(private readonly transferService: TransfersService) {}

  @UseGuards(AuthGuard)
  @Mutation(() => Transfer, { name: 'cancelTransfer' })
  withdrawBalance(
    @GetCurrentUser() currentUser: CurrentUserType,
    @Args('withdrawValue', { type: () => Number }) withdrawValue: number,
    @Args('transferId', { type: () => String })
    transferId: string,
  ) {
    return this.transferService.cancelTransfer(transferId, currentUser.userId);
  }
}
