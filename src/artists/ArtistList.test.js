import React from "react";
import { render } from "@testing-library/react";
import Artists from "./ArtistList";

it("matches snapshot", function () {
  const { asFragment } = render(<Artists />);
  expect(asFragment()).toMatchSnapshot();
});
