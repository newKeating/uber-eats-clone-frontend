import { CSSReset, theme, ThemeProvider } from "@chakra-ui/react";
import withApollo from "../apollo/withApollo";
import { useMeQuery } from "../generated/graphql";
import "../styles/globals.css";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";

function MyApp({ Component, pageProps, ctx }: any) {
  // const { data: meQueryData, loading } = useMeQuery();
  // console.log("-app loading", loading);
  // console.log("-app meQuery", meQueryData);

  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
