import React from "react";
import { render } from "@testing-library/react";
import FavoriteCard from "./FavoriteCard";
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <FavoriteCard id="K8vZ9171o-f" name="Rithm School" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <FavoriteCard id="K8vZ9171o-f" name="Algo School" />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
