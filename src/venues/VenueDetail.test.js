// import React from "react";
// import { render } from "@testing-library/react";
// import Venue from "./VenueDetail";
// import { MemoryRouter, Route } from "react-router-dom";
// import { UserProvider } from "../testUtils";

// it("renders without crashing", function () {
//   render(
//     <MemoryRouter>
//       <UserProvider>
//         <Venue />
//       </UserProvider>
//     </MemoryRouter>
//   );
// });

// it("matches snapshot", function () {
//   const { asFragment } = render(
//     <MemoryRouter initialEntries={["/venue/KovZpZA7AAEA"]}>
//       <UserProvider>
//         <Route path="/venues/:id">
//           <Venue />
//         </Route>
//       </UserProvider>
//     </MemoryRouter>
//   );
//   expect(asFragment()).toMatchSnapshot();
// });

// VenueDetail.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { useParams } from "react-router-dom";
import EventApi from "../api/api";
import VenueDetail from "./VenueDetail";

// Mock useParams
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

// Mock the API module
jest.mock("../api/api");

describe("VenueDetail", () => {
  test("renders venue detail", async () => {
    // Mock useParams to return an ID
    useParams.mockReturnValue({ id: "123" });

    // Mock the API response
    const mockVenue = {
      id: "123",
      name: "Test Venue",
      images: "test-image.jpg",
      address: "Test Address",
      state: "Test State",
      zipCode: "12345",
      longitude: 0,
      latitude: 0,
    };
    const mockEvents = [
      { id: "1", name: "Event 1", images: "event1.jpg" },
      { id: "2", name: "Event 2", images: "event2.jpg" },
    ];
    EventApi.getVenuesById.mockResolvedValue(mockVenue);
    EventApi.getEventsByVenueId.mockResolvedValue(mockEvents);

    render(<VenueDetail />);

    // Wait for the venue details and events to appear
    await waitFor(() => {
      expect(screen.getByText(/Test Venue/i)).toBeInTheDocument();
      expect(
        screen.getByText(/Test Address, Test State, Test State, 12345/i)
      ).toBeInTheDocument();
      expect(screen.getByAltText(/Test Venue/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Event 1/i)).toBeInTheDocument();
      expect(screen.getByAltText(/Event 2/i)).toBeInTheDocument();
    });
  });
});
