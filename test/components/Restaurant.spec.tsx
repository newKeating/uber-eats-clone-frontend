import { render } from "@testing-library/react";
import React from "react";
import Restaurant from "../../src/components/Restaurant";

describe("<Restaurant />", () => {
  it("redners OK with props", () => {
    const { debug, getByText } = render(
      <Restaurant name="name" categoryName="categoryName" restaurantId={1} />
    );
    getByText("name");
    getByText("categoryName");
  });
});
