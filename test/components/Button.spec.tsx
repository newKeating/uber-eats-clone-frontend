import React from "react";
import { render } from "@testing-library/react";
import Button from "../../src/components/Button";

describe("<Button />", () => {
  it("renders OK", () => {
    render(<Button />);
  });
});
