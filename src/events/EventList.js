import React, { useState, useEffect, useTransition } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SearchForm from "../common/SearchForm";
import EventApi from "../api/api";
import EventCard from "./EventCard";
import LoadingSpinner from "../common/LoadingSpinner";
import useSort from "../hooks/useSort";

// Define ITEMS_PER_PAGE constant
const ITEMS_PER_PAGE = 50;

function EventList() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition({ timeoutMs: 3000 });

  const searchParams = new URLSearchParams(location.search);
  const initialPage = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);

  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Use transition to start fetching data
    startTransition(() => {
      getEvents();
    });
  }, [currentPage, searchTerm, totalPages, startTransition]);

  async function getEvents() {
    try {
      const paginatedEvents = await EventApi.getEvents(currentPage, searchTerm);

      // Calculate the start and end indices based on the current page and items per page
      const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      // Get the events for the current page
      const eventsForPage = paginatedEvents.slice(startIndex, endIndex);

      setEvents(eventsForPage);

      // Calculate totalPages based on the total items and items per page
      const totalPages = Math.ceil(paginatedEvents.length / ITEMS_PER_PAGE);

      // Update the URL with the current page and total pages
      const newUrl = `/events?page=${currentPage}&totalPages=${totalPages}`;
      navigate(newUrl);
      // Set total pages state
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error while fetching events:", error);
      setEvents([]);
    }
  }

  async function search(searchTerm) {
    try {
      if (searchTerm) {
        // Perform a search using the API
        const filteredEvents = await EventApi.searchEvents(searchTerm);

        // Update only the events for the current page based on the search results
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        const eventsForPage = filteredEvents.slice(startIndex, endIndex);

        setEvents(eventsForPage);
      } else {
        // If the search term is empty, fetch all events for the current page
        await getEvents();
      }
    } catch (error) {
      console.error("Error while searching events:", error);
      setEvents([]);
    }
  }

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };
  const {
    sortedData: sortedEvents,
    sortOrder,
    handleSortChange,
  } = useSort(events, "");

  if (isPending) return <LoadingSpinner />;

  return (
    <div className="EventList col-md-8 offset-md-2">
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
      {sortedEvents.length ? (
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {sortedEvents.map((e) => (
            <EventCard
              key={e.id}
              id={e.id}
              name={e.name}
              url={e.url}
              images={e.images}
              category={e.category}
              startDate={e.startDate}
              city={e.city}
              state={e.state}
            />
          ))}
        </div>
      ) : (
        <p className="lead">Sorry, no results were found!</p>
      )}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </div>
  );
}

export default EventList;
