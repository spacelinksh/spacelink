import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { RoleEnum } from '@prisma/client';
import { BaseModel } from 'src/app/utils/types/base-model';
import { Wallet } from './wallet.model';

registerEnumType(RoleEnum, { name: 'RoleEnum' });
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

  @Field(() => RoleEnum, { description: 'Name of the user' })
  role: RoleEnum;

  @Field(() => Wallet, { description: 'Wallet of the user' })
  wallet: Wallet;
}
