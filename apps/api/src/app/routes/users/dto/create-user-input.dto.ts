import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { RoleEnum } from '@prisma/client';

registerEnumType(RoleEnum, { name: 'RoleEnum' });
@InputType()
export class CreateUserInput {
  @Field(() => String, { description: 'Name of the user' })
  name: string;

  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @Field(() => String, { description: 'Phone of the user' })
  phone: string;

  @Field(() => String, { description: 'Password of the user' })
  password: string;

  @Field(() => String, { description: 'Document (CPF) of the user' })
  document: string;

  @Field(() => RoleEnum, { description: 'Role of the user' })
  role: RoleEnum;
}
