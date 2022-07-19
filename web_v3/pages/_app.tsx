import "../styles/globals.css"; // this is for tailwindcss, don't delete
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Kooki | Find Recipes</title>
        <meta
          name="description"
          content="Find your next favorite meal"
          key="desc"
        />
      </Head>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
