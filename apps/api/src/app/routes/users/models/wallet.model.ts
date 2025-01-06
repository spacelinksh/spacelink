import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/app/utils/types/base-model';

@ObjectType()
export class Wallet extends BaseModel {
  @Field(() => Number, { description: 'Wallet balance amount' })
  balance: number;

  @Field(() => Boolean, { description: 'Is active status of the wallet' })
  isActive: boolean;
}
