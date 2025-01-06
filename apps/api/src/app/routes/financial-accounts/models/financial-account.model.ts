import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { TransferKeyType } from '@prisma/client';
import { BaseModel } from 'src/app/utils/types/base-model';

registerEnumType(TransferKeyType, { name: 'TransferKeyType' });
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

  @Field(() => TransferKeyType, { description: 'Transfer key type' })
  transferKeyType: TransferKeyType;
}
