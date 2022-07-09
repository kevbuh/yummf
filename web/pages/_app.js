import "../styles/globals.css"; // need to keep this or else tailwind will break
import Head from "next/head";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { useState } from "react";
import { store } from "../redux/store";
import { Provider } from "react-redux";

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

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Head>
          <title>Kooki, the Food Platform</title>
        </Head>
        <Component {...pageProps} />
        <ReactQueryDevtools />
      </QueryClientProvider>
    </Provider>
  );
};

export default App;
