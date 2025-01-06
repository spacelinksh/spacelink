import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/app/utils/types/base-model';
import { Wallet } from './wallet.model';

@ObjectType()
export class User extends BaseModel {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Phone of the user' })
  phone: string;

  @Field(() => String, { description: 'Document (CPF) of the user' })
  document: string;

  @Field(() => Wallet, { description: 'Wallet of the user' })
  wallet: Wallet;
}
