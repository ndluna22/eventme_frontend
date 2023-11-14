// VenueList.test.js
import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import VenueList from "./VenueList";
import EventApi from "../api/api";

it("matches snapshot", function () {
  const { asFragment } = render(<Venues />);
  expect(asFragment()).toMatchSnapshot();
});

// Mock the API module
jest.mock("../api/api");

describe("VenueList", () => {
  test("renders venue list and handles search", async () => {
    // Mock the API response
    const mockVenues = [
      { id: "1", name: "Venue 1", city: "City 1", state: "State 1" },
      { id: "2", name: "Venue 2", city: "City 2", state: "State 2" },
    ];
    EventApi.getVenues.mockResolvedValue(mockVenues);

    render(<VenueList />);

    // Wait for the search form and select to appear
    await waitFor(() => {
      expect(screen.getByLabelText(/sort by/i)).toBeInTheDocument();
    });

    // Mock the search input and submit the form
    const searchInput = screen.getByLabelText(/search/i);
    userEvent.type(searchInput, "Venue");
    userEvent.click(screen.getByRole("button", { name: /search/i }));

    // Wait for the venues to appear
    await waitFor(() => {
      expect(EventApi.getVenues).toHaveBeenCalledWith("Venue");
      expect(screen.getByText(/Venue 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Venue 2/i)).toBeInTheDocument();
    });

    // Verify the sorting functionality (you can add more tests)
    userEvent.selectOptions(screen.getByLabelText(/sort by/i), "AtoZ");
    await waitFor(() => {
      expect(screen.getByText(/Venue 1/i)).toBeInTheDocument();
      expect(screen.getByText(/Venue 2/i)).toBeInTheDocument();
    });
  });
});
