import "../styles/globals.css"; // this is for tailwindcss, don't delete
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import { useState } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import Script from "next/script";

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );

  return (
    <SessionProvider session={session}>
      <Head>
        <title>Yummf | Find Recipes</title>
        <meta
          name="description"
          content="Find your next favorite meal"
          key="desc"
        />
        <link rel="shortcut icon" href="/yummf_v2_favico.svg" />
      </Head>
      <Script
        id="Adsense-id"
        data-ad-client="ca-pub-7158717683717233"
        async
        strategy="afterInteractive"
        onError={(e) => {
          console.error("Google AdSense Script failed to load", e);
        }}
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"
      />
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default MyApp;
