import "../styles/globals.css"; // need to keep this or else tailwind will break
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import mixpanel from "mixpanel-browser";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
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

  mixpanel.init("fe954f9cea9b43ee01a8374815b78e20", {
    debug: true,
  });

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Kooki, the Food Platform</title>
          <link
            rel="shortcut icon"
            href="https://raw.githubusercontent.com/kevbuh/kooki/db3841fde911794d493a60dd8df5a1099d498309/web/public/favicon.svg"
          />
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
