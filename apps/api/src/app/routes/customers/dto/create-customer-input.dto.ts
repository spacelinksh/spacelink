import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateCustomerInput {
  @Field(() => String, { description: 'Name of the customer' })
  name: string;

  @Field(() => String, { description: 'Email of the customer' })
  email: string;

  @Field(() => String, { description: 'Phone of the customer' })
  phone: string;

  @Field(() => String, { description: 'Document (CPF) of the customer' })
  document: string;
}
