import { User } from "@/src/graphql/graphql";
import { TypedDocumentNode, gql } from "@apollo/client";

export const GET_CURRENT_USER: TypedDocumentNode<{
  getCurrentUser: User;
}> = gql`
  query GET_CURRENT_USER {
    getCurrentUser {
      id
      name
      email
      document
      phone
      role
    }
  }
`;
