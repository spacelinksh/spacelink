import { CreateCustomerInput, Customer } from "@/src/graphql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const CREATE_CUSTOMER: TypedDocumentNode<{
  createCustomer: Customer;
  createCustomerInput: CreateCustomerInput;
}> = gql`
  mutation CREATE_CUSTOMER($createCustomerInput: CreateCustomerInput!) {
    createCustomer(createCustomerInput: $createCustomerInput) {
      id
    }
  }
`;
