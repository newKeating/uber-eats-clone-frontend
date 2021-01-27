import { CSSReset, theme, ThemeProvider } from "@chakra-ui/react";
import "../styles/globals.css";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }: AppProps) {
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
