import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import EventApi from "../api/api";
import ArtistCard from "../artists/ArtistCard";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import LoadingSpinner from "../common/LoadingSpinner";

function EventDetail() {
  const { id } = useParams();
  console.debug("EventDetail", "id=", id);

  const [event, setEvent] = useState({ artists: [] });

  useEffect(() => {
    async function fetchEventData() {
      try {
        // Fetch event data from your API
        const eventData = await EventApi.getEventById(id);
        setEvent(eventData);
      } catch (error) {
        // Handle errors if the API request fails
        console.error("Error fetching event data:", error);
      }
    }

    fetchEventData();
  }, [id]);

  if (!event || !event.artists || event.artists.length === 0) {
    return <LoadingSpinner />;
  }

  //since it's normally only two per team
  const firstTwoArtists = event.artists.slice(0, 2);

  return (
    <div className="EventDetail col-md-8 offset-md-2">
      <h4>{event.name}</h4>
      <img src={event.images} alt={event.name} width="600px" />
      <p>{event.genre}</p>
      <p>
        Venue: <Link to={`/venues/${event.venueId}`}>{event.venueName}</Link>{" "}
      </p>
      <p>
        {event.startDate} at {event.startTime}
      </p>
      {/* <div>
        <h2>Performers:</h2> */}
      {/* The map function is used to iterate over each element in the firstTwoArtists array and create a list item for each artist. */}
      {/* <ul>
          {firstTwoArtists.map((artist, index) => (
            <li key={index}>
              <Link to={`/artists/${event.artistIds[index]}`}>{artist}</Link>{" "}
              {/* Use artist ID in the link */}
      {/* </li>
          ))}
        </ul> */}{" "}
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {firstTwoArtists.map((artist, index) => (
          <Card key={index} sx={{ width: 300 }}>
            <div>
              Performer:
              <Typography level="title-lg">{artist.name}</Typography>
              <Typography level="body-sm"></Typography>
            </div>
            <AspectRatio minHeight="120px" maxHeight="200px">
              <img
                src={artist.images}
                srcSet={artist.images}
                loading="lazy"
                alt=""
              />
            </AspectRatio>
            <CardContent orientation="horizontal">
              <div>
                {/* Link to the artist details */}
                <Link to={`/artists/${artist.id}`}>
                  <Button
                    variant="solid"
                    size="md"
                    color="primary"
                    aria-label="Explore"
                    sx={{ mt: 2, fontWeight: 600 }}
                  >
                    Explore
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default EventDetail;
