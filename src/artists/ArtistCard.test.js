import React from "react";
import { render } from "@testing-library/react";
import ArtistCard from "./ArtistCard";
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ArtistCard
        id="K8vZ91712W7"
        name="U2"
        images="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <ArtistCard
        id="K8vZ91712W7"
        name="U2"
        images="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
