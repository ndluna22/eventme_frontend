import React from "react";
import { render } from "@testing-library/react";
import EventCard from "./EventCard";
import { MemoryRouter } from "react-router";

it("matches snapshot with logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <EventCard
        id="Z7r9jZ1AdJ4aP"
        name="Utah Jazz vs. Phoenix Suns"
        images="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});

it("matches snapshot without logo", function () {
  const { asFragment } = render(
    <MemoryRouter>
      <EventCard
        id="Z7r9jZ1AdJ4aP"
        name="Utah Jazz vs. Phoenix Suns"
        images="https://pbs.twimg.com/profile_images/770491761412173826/ZUeIa4tw_400x400.jpg"
      />
    </MemoryRouter>
  );
  expect(asFragment()).toMatchSnapshot();
});
