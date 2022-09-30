import { initializeIcons } from "@fluentui/react";
import type { NextPage } from "next";
import Head from "next/head";
import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { App } from "../components/App";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Jorge test platform</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </div>
  );
};

// Only run in client
if (typeof window !== "undefined") {
  initializeIcons();
}

export default Home;
