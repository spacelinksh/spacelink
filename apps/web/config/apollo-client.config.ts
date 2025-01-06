import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  Observable,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { print } from "graphql";
import { createClient } from "graphql-ws";
import { GRAPHQL_URL, WS_URL } from "./env.config";
import Cookies from "js-cookie";

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const wsLink = new ApolloLink((operation) => {
  return new Observable((observer) => {
    const client = createClient({
      url: WS_URL || "",
      shouldRetry: () => true,
    });

    const { query, variables, operationName } = operation;
    const payload = { query: print(query), variables, operationName };

    const onNext = observer.next.bind(observer);
    const onError = observer.error.bind(observer);
    const onComplete = () => {
      observer.complete.bind(observer);
      client.dispose();
    };

    client.subscribe(payload, {
      next: onNext,
      error: onError,
      complete: onComplete,
    });
  });
});

const authLinkHeader = setContext(async (_, { headers }) => {
  let token = "";
  const getToken = Cookies.get("auth_token");

  if (!getToken) {
    return {
      headers: {
        ...headers,
      },
    };
  } else {
    token = getToken;
  }

  return {
    headers: {
      ...headers,
      Authorization: token,
    },
  };
});

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  authLinkHeader.concat(httpLink)
);

export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});
