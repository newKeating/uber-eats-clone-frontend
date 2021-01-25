import {
  ApolloClient,
  createHttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { useMemo } from "react";
import { authTokenVar, isLoggedInVar } from "./globalState";

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

let apolloClient: ApolloClient<NormalizedCacheObject>;

function createApolloClient() {
  return new ApolloClient({
    ssrMode: typeof window === "undefined",
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
}

export function initializeApollo(initialState = null) {
  const _apolloClient = apolloClient ?? createApolloClient();

  if (initialState) {
    _apolloClient.cache.restore(initialState);
  }

  if (typeof window === "undefined") return _apolloClient;
  apolloClient = apolloClient ?? _apolloClient;

  return apolloClient;
}

export function useApollo(initialState) {
  const store = useMemo(() => initializeApollo(initialState), [initialState]);
  return store;
}
