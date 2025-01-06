import { Wallet } from "@/src/graphql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const WITHDRAW_BALANCE: TypedDocumentNode<{
  withdrawBalance: Wallet;
  withdrawValue: Number;
  financialAccountId: String;
}> = gql`
  mutation WITHDRAW_BALANCE(
    $withdrawValue: Float!
    $financialAccountId: String!
  ) {
    withdrawBalance(
      withdrawValue: $withdrawValue
      financialAccountId: $financialAccountId
    ) {
      id
    }
  }
`;
