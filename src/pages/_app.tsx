import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";
import "../styles/globals.css";
import { ThemeProvider, theme, CSSReset } from "@chakra-ui/react";

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default MyApp;
