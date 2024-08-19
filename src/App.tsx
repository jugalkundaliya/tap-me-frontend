import React from "react";
import CoinTap from "./components/CoinTap";
import Layout from "./components/Layout";
import { ApolloProvider } from "@apollo/client";
import client from "./graphql/apolloClient";

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <Layout>
        <CoinTap />
      </Layout>
    </ApolloProvider>
  );
};

export default App;
