import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import EventApi from "../api/api";
import VenueCard from "./VenueCard";
import LoadingSpinner from "../common/LoadingSpinner";
import useSort from "../hooks/useSort"; // Import the useSort hook

function VenueList() {
  console.debug("VenueList");

  const [venues, setVenues] = useState(null);

  useEffect(function getVenuesOnMount() {
    console.debug("VenueList useEffect getVenuesOnMount");
    search();
  }, []);

  /** Triggered by search form submit; reloads venues. */
  async function search(name) {
    let venues = await EventApi.getVenues(name);
    setVenues(venues);
  }

  const {
    sortedData: sortedVenues,
    sortOrder,
    handleSortChange,
  } = useSort(venues, ""); // Set initialSortOrder to an empty string to get Select first

  if (!sortedVenues) return <LoadingSpinner />;

  return (
    <div className="VenueList col-md-8 offset-md-2">
      <SearchForm searchFor={search} />
      <div>
        <label>Sort by: </label>
        <select
          value={sortOrder} // Set this value to an empty string
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Select</option> {/* Add the "Select" option */}
          <option value="AtoZ">A to Z</option>
          <option value="ZtoA">Z to A</option>
        </select>
      </div>

      {sortedVenues.length ? (
        <div class="row row-cols-1 row-cols-md-3 g-4">
          {sortedVenues.map((v) => (
            <VenueCard
              key={v.id}
              id={v.id}
              name={v.name}
              images={v.images}
              city={v.city}
              state={v.state}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default VenueList;

{
  /* name: venue.name,
      id: venue.id,
      images: venue.images[0].url,
      address: venue.address.line1,
      city: venue.city.name,
      state: venue.state.name,
      country: venue.country.name,
      zipCode: venue.postalCode,
      longitude: venue.location.longitude,
      latitude: venue.location.latitude, */
}
