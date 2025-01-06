import { Field, InputType, registerEnumType } from '@nestjs/graphql';
import { TransferKeyType } from '@prisma/client';

registerEnumType(TransferKeyType, { name: 'TransferKeyType' });
@InputType()
export class CreateFinancialAccountInput {
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
