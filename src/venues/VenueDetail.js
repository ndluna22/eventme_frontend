import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import EventApi from "../api/api";
import EventCard from "../events/EventCard";
import LoadingSpinner from "../common/LoadingSpinner";
import { Map, MapStyle, GeolocationType, config } from "@maptiler/sdk";
import MapKey from "../key";
// Set the API key
config.apiKey = MapKey; // Replace with your actual MapTiler API key

function VenueDetail() {
  const { id } = useParams();
  console.debug("VenueDetail", "id=", id);

  const [venue, setVenue] = useState(null);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const venueData = await EventApi.getVenuesById(id);
        setVenue(venueData);

        const upcomingEvents = await EventApi.getEventsByVenueId(id);
        setEvents(upcomingEvents);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id]);

  useEffect(() => {
    // Create a new Map object and render it when the component mounts
    if (venue && venue.longitude && venue.latitude) {
      const map = new Map({
        container: "map", // container's id or the HTML element to render the map
        style: MapStyle.STREETS,
        center: [venue.longitude, venue.latitude], // Correct usage of longitude and latitude
        zoom: 14, // starting zoom
      });

      // Clean up the map when the component unmounts
      return () => {
        map.remove();
      };
    }
  }, [venue]);

  if (!venue) return <LoadingSpinner />;

  return (
    <div className="VenueDetail col-md-8 offset-md-2">
      <h4>{venue.name}</h4>

      {venue.images && venue.images.length > 0 && (
        <img src={venue.images} alt={venue.name} width="300px" />
      )}
      <p>
        Address: {venue.address}, {venue.state}, {venue.state}, {venue.zipCode}
      </p>

      {/* Map container */}
      <div id="map" style={{ height: "200px", width: "100%" }}></div>

      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>

      <h5>Upcoming Events:</h5>
      {events.length > 0 ? (
        <div class="row row-cols-1 row-cols-md-4 g-4">
          {events.map((e) => (
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
      ) : (
        <p>No upcoming events found for this venue.</p>
      )}
    </div>
  );
}

export default VenueDetail;
