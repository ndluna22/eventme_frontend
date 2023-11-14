import React, { useState, useEffect } from "react";
import SearchForm from "./SearchForm";
import EventApi from "../api/api";
import EventCard from "../events/EventCard";
import ArtistCard from "../artists/ArtistCard";
import VenueCard from "../venues/VenueCard";
import useSort from "../hooks/useSort"; // Import the useSort hook

function SearchComponent() {
  const [searchResults, setSearchResults] = useState([]);
  const [artists, setArtists] = useState(null);
  const [events, setEvents] = useState(null);
  const [venues, setVenues] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  async function searchFor(searchTerm) {
    if (!searchTerm) {
      setSearchResults([]);
      setHasSearched(false);
      return;
    }

    try {
      const [searchedArtists, searchedEvents, searchedVenues] =
        await Promise.all([
          EventApi.searchArtists(searchTerm),
          EventApi.searchEvents(searchTerm),
          EventApi.searchVenues(searchTerm),
        ]);

      const allResults = [
        ...searchedArtists,
        ...searchedEvents,
        ...searchedVenues,
      ];

      setArtists(searchedArtists);
      setEvents(searchedEvents);
      setVenues(searchedVenues);
      setSearchResults(allResults);
      setHasSearched(true);
    } catch (error) {
      console.error("Error while searching artists and events:", error);
      setSearchResults([]);
      setHasSearched(true);
    }
  }

  const artistsRes = artists || [];
  const eventsRes = events || [];
  const venuesRes = venues || [];

  return (
    <div className="SearchList col-md-8 offset-md-2">
      <SearchForm searchFor={searchFor} />
      {hasSearched && ( // Only show results if a search has been performed
        <div>
          {artistsRes.length > 0 && ( // Check if there are artists results
            <div>
              <label>Artists: </label>
              <div class="row row-cols-1 row-cols-md-4 g-4">
                {artistsRes.map((a) => (
                  <ArtistCard
                    key={a.id}
                    id={a.id}
                    name={a.name}
                    images={a.images}
                    category={a.category}
                  />
                ))}
              </div>
            </div>
          )}

          {eventsRes.length > 0 && ( // Check if there are events results
            <div>
              <label>Events: </label>
              <div class="row row-cols-1 row-cols-md-4 g-4">
                {eventsRes.map((e) => (
                  <EventCard
                    key={e.id}
                    id={e.id}
                    name={e.name}
                    url={e.url}
                    images={e.images}
                    genre={e.genre}
                    startDate={e.startDate}
                    city={e.city}
                    state={e.state}
                  />
                ))}
              </div>
            </div>
          )}

          {venuesRes.length > 0 && ( // Check if there are venues results
            <div>
              <label>Venues: </label>
              <div class="row row-cols-1 row-cols-md-4 g-4">
                {venuesRes.map((v) => (
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
            </div>
          )}

          {artistsRes.length === 0 &&
            eventsRes.length === 0 &&
            venuesRes.length === 0 && (
              <p className="lead">Sorry, no results were found!</p>
            )}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
