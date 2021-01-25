import createWithApollo from "./newCreateWithApollo";
import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { NextPageContext } from "next";
import { isLoggedInVar, authTokenVar } from "./globalState";

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

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
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

const withApollo = createWithApollo(apolloClient);

export default withApollo;
