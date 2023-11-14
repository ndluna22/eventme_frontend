import React, { useState, useEffect } from "react";
import SearchForm from "../common/SearchForm";
import EventApi from "../api/api";
import ArtistCard from "./ArtistCard";
import LoadingSpinner from "../common/LoadingSpinner";
import useSort from "../hooks/useSort"; // Import the useSort hook

function ArtistList() {
  console.debug("ArtistsList");
  const [artists, setArtists] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // Initialize searchTerm state

  useEffect(() => {
    getArtists();
  }, []);

  async function getArtists() {
    try {
      const allArtists = await EventApi.getArtists();
      setArtists(allArtists);
    } catch (error) {
      console.error("Error while fetching events:", error);
      setArtists([]);
    }
  }

  async function search(searchTerm) {
    try {
      if (searchTerm) {
        const filteredArtists = await EventApi.searchArtists(searchTerm);
        setArtists(filteredArtists);
      }
    } catch (error) {
      console.error("Error while searching artists:", error);
      setArtists([]);
    }
  }

  const {
    sortedData: sortedArtists,
    sortOrder,
    handleSortChange,
  } = useSort(artists, "");

  if (!sortedArtists) return <LoadingSpinner />;

  return (
    <div className="ArtistList col-md-8 offset-md-2">
      <SearchForm searchFor={search} setSearchTerm={setSearchTerm} />
      <div>
        <label>Sort by: </label>
        <select
          value={sortOrder}
          onChange={(e) => handleSortChange(e.target.value)}
        >
          <option value="">Select</option>
          <option value="AtoZ">A to Z</option>
          <option value="ZtoA">Z to A</option>
        </select>
      </div>

      {/*       
      {sortedArtists.length ? (
        <div className="ArtistList-list">
          {sortedArtists.map((a) => (
            <ArtistCard key={a.id} id={a.id} name={a.name} images={a.images} />
          ))}
        </div> */}

      {sortedArtists.length ? (
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {sortedArtists.map((a) => (
            <ArtistCard
              key={a.id}
              id={a.id}
              name={a.name}
              images={a.images}
              category={a.category}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
    </div>
  );
}

export default ArtistList;
