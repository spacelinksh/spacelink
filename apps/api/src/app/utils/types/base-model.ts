import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class BaseModel {
  @Field(() => ID, { description: 'ID field' })
  id: string;

  @Field(() => Date, { description: 'Creation date' })
  createdAt: Date;

  @Field(() => Date, { description: 'Update date' })
  updatedAt: Date;
}
