import React from "react";
import { render } from "@testing-library/react";
import SuggestList from "./SuggestList";

it("matches snapshot", function () {
  const { asFragment } = render(<SuggestList />);
  expect(asFragment()).toMatchSnapshot();
});
