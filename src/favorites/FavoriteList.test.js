import React from "react";
import { render } from "@testing-library/react";
import FavoriteList from "./FavoriteList";

it("matches snapshot", function () {
  const { asFragment } = render(<FavoriteList />);
  expect(asFragment()).toMatchSnapshot();
});
