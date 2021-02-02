import { createWithApollo } from "./createWithApollo";
import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  split,
} from "@apollo/client";
import { WebSocketLink } from "@apollo/client/link/ws";
import { setContext } from "@apollo/client/link/context";
import { NextPageContext } from "next";
import { isLoggedInVar, authTokenVar } from "./globalState";
import { getMainDefinition } from "@apollo/client/utilities";
import { isServer } from "../utils/isServer";

const wsLink = !isServer()
  ? new WebSocketLink({
      uri: process.env.NEXT_PUBLIC_WS_URL as string,
      options: {
        reconnect: true,
        connectionParams: {
          "x-jwt": authTokenVar() || "",
        },
      },
    })
  : null;

const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URL as string,
});

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      "x-jwt": authTokenVar() || "",
    },
  };
});

const link = !isServer()
  ? split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === "OperationDefinition" &&
          definition.operation === "subscription"
        );
      },
      wsLink,
      authLink.concat(httpLink)
    )
  : authLink.concat(httpLink);

const apolloClient = new ApolloClient({
  link,
  // credentials: "include",
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          isLoggedIn: {
            read() {
              return isLoggedInVar();
            },
          },
          token: {
            read() {
              return authTokenVar();
            },
          },
        },
      },
    },
  }),
});

const createClient = (ctx: NextPageContext) => {
  return apolloClient;
};

const withApollo = createWithApollo(createClient);

export default withApollo;
