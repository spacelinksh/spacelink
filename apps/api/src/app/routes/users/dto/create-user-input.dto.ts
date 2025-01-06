import { Field, InputType } from '@nestjs/graphql';

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
}
