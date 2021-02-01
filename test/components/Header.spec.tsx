import { render, waitFor } from "@testing-library/react";
import React from "react";
// import Header, { PureHeader } from "../../src/components/Header";
import Header from "../../src/components/Header";
import { ApolloProvider } from "@apollo/client";
import { createMockClient } from "mock-apollo-client";
import { MockedProvider } from "@apollo/client/testing";
import withApolloMocked from "../../src/apollo/__mock__/withApolloMocked";

describe("<Header />", () => {
  it("renders ok", async () => {
    const mockedClient = createMockClient();
    render(
      <ApolloProvider client={mockedClient}>
        <Header />
      </ApolloProvider>
    );
  });
});
