import { render } from "@testing-library/react";
import React from "react";
import ErrorMessage from "../../src/components/ErrorMessage";

describe("<ErrorMessage />", () => {
  it("renders OK with props", () => {
    const { getByText } = render(
      <ErrorMessage errorMessage="This is an error message" />
    );
    getByText("This is an error message");
  });
});
