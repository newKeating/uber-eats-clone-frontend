import React from "react";
import { createMockClient } from "mock-apollo-client";
import { ApolloProvider } from "@apollo/client";

const withApolloMocked = (WrappedComponent: React.FC<any>) => (props) => {
  const mockedClient = createMockClient();

  return (
    <ApolloProvider client={mockedClient}>
      <WrappedComponent {...props} />
    </ApolloProvider>
  );
};

export default withApolloMocked;
