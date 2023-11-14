import React from "react";
import { render } from "@testing-library/react";
import VenueCard from "./VenueCard";
import { MemoryRouter } from "react-router";

it("matches snapshot with name", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <VenueCard
        id="1234"
        name="Sphere"
        images="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without name", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <VenueCard
        id="5213"
        name="Sphere"
        images="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
