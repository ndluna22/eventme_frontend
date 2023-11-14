import React from "react";
import { render } from "@testing-library/react";
import categories from "./CategoryList";

it("matches snapshot", function () {
  const { asFragment } = render(<Categories />);
  expect(asFragment()).toMatchSnapshot();
});
