import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../apollo/apolloClient";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: any) {
  const apolloClient = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
