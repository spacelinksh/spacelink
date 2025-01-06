import { Customer } from "@/src/graphql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const GET_CUSTOMER: TypedDocumentNode<{
  getCustomer: Customer;
  id: string;
}> = gql`
  query GET_CUSTOMER($getCustomerId: String!) {
    getCustomer(id: $getCustomerId) {
      id
      name
      email
      document
      phone
      createdAt
      updatedAt
    }
  }
`;
