import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/app/utils/types/base-model';
import { User } from '../../users/models/user.model';
import { FinancialAccount } from '../../financial-accounts/models/financial-account.model';

@ObjectType()
export class Transfer extends BaseModel {
  @Field(() => String, { description: 'Total value of the transfer' })
  transferValue: string;

  @Field(() => FinancialAccount, {
    description: 'Financial account of the transfer',
  })
  financialAccount: FinancialAccount;

  @Field(() => User, { description: 'User of the transfer' })
  user: User;

  @Field(() => String, { description: 'Transaction token for gateway' })
  token: string;
}
