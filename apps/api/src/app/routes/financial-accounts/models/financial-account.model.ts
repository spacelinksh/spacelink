import { Field, ObjectType } from '@nestjs/graphql';
import { BaseModel } from 'src/app/utils/types/base-model';

@ObjectType()
export class FinancialAccount extends BaseModel {
  @Field(() => String, { description: 'Account number with digit' })
  account: string;

  @Field(() => String, { description: 'Agency number with digit' })
  agency: string;

  @Field(() => String, { description: 'Bank holder number with digit' })
  bankHolder: string;

  @Field(() => String, { description: 'Transfer key (PIX)' })
  transferKey: string;
}
