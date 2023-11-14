import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import EventApi from "../api/api";
import EventCard from "../events/EventCard";
import ReviewForm from "../reviews/ReviewForm";
import LoadingSpinner from "../common/LoadingSpinner"; // Remove duplicate import
import UserContext from "../auth/UserContext";
import useLocalStorage from "../hooks/useLocalStorage";
import AllReviewsList from "../reviews/AllReviewsList";
import Button from "@mui/material-next/Button";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { pink } from "@mui/material/colors";

function ArtistDetail() {
  const { id } = useParams();
  console.debug("ArtistDetail", "id=", id);

  const [artist, setArtist] = useState(null);
  const [events, setEvents] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false);
  const { currentUser } = useContext(UserContext);
  const [favoriteArtists, setFavoriteArtists] = useLocalStorage(
    "favoriteArtists",
    []
  );
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        console.log("Fetching artist ID:", id);

        // Get artist by Id
        const artistData = await EventApi.getArtistById(id);
        setArtist(artistData);

        // Get all events by artist id
        const upcomingEvents = await EventApi.getEventsByArtistId(id);
        setEvents(upcomingEvents);

        // Fetch reviews for the current artist
        const allUserReviews = await EventApi.getReviewsByArtistId(id);
        setReviews(allUserReviews);

        console.log("Fetched upcoming events:", upcomingEvents);
      } catch (error) {
        // Handle errors if the API requests fail
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [id, currentUser]);

  useEffect(() => {
    // When the component mounts, initialize favoriteArtists state with the value from local storage
    setFavoriteArtists(localStorage.getItem("favoriteArtists").split(","));
    // Check if the current artist ID is in the list of favorite artists and set isFavorited accordingly
    setIsFavorited(favoriteArtists.includes(id));
  }, []);

  useEffect(() => {
    setIsFavorited(favoriteArtists.includes(id));
  }, [favoriteArtists, id]);

  const addReview = (review) => {
    console.log("New Review:", review);
    setReviews([...reviews, review]);
  };

  // Function to handle the favorite action
  async function handleFavoriteClick(artistId, artistDetails) {
    try {
      if (!currentUser || !currentUser.username) {
        console.error("Current user data is missing or incomplete.");
        // Handle the error case, such as displaying an error message to the user
        return;
      }

      const data = {
        artistId: artistId,
        artist_name: artistDetails.artist_name,
        artist_image: artistDetails.artist_image,
        artist_url: artistDetails.artist_url, // Assuming artistId is the artist's identifier
        // Add any other required data for favorites
      }; // Replace with the actual data

      // Call your API function to add the artist to favorites with the current user's data
      await EventApi.addFavorite(currentUser.username, artistId, data);

      // Update local storage to include the new favorite artist
      setFavoriteArtists([...favoriteArtists, artistId]);

      // Update the state to indicate that the artist is favorited
      setIsFavorited(true);
    } catch (error) {
      console.error("Error favoriting artist:", error);
      // Handle any errors, such as displaying an error message to the user
    }
  }

  async function handleRemoveFavorite(artistId) {
    try {
      if (!currentUser || !currentUser.username) {
        console.error("Current user data is missing or incomplete.");
        // Handle the error case, such as displaying an error message to the user
        return;
      }

      // Call your API function to remove the artist from favorites with the current user's data
      await EventApi.deleteFavorite(currentUser.username, artistId);

      // Update the state to indicate that the artist is no longer favorited
      setIsFavorited(false);

      // Update local storage to remove the artist from the list of favorite artists
      setFavoriteArtists(favoriteArtists.filter((id) => id !== artistId));
    } catch (error) {
      console.error("Error removing favorite artist:", error);
      // Handle any errors, such as displaying an error message to the user
    }
  }

  if (!artist) return <LoadingSpinner />;

  return (
    <div className="ArtistDetail col-md-8 offset-md-2">
      <h4>
        {artist.name}
        <p></p>
        {isFavorited ? (
          <Button
            color="primary"
            variant="filledTonal"
            onClick={() => handleRemoveFavorite(id)}
          >
            Remove Favorite
          </Button>
        ) : (
          <Button
            color="primary"
            variant="filled"
            // className="btn btn-primary"
            onClick={() =>
              handleFavoriteClick(id, {
                artist_name: artist.name,
                artist_image: artist.images,
                artist_url: artist.url,
              })
            }
            startIcon={<FavoriteIcon />}
          >
            Favorite
          </Button>
        )}
      </h4>

      <img
        src={artist.images}
        alt={artist.name}
        width="600px
      "
      />

      <p>
        Homepage:{" "}
        {artist.url ? <a href={artist.url}>{artist.url}</a> : "Not available"}
      </p>

      <br></br>
      <br></br>
      <div>
        <h5>Reviews:</h5>
        <AllReviewsList key={Date.now()} id={id} reviews={reviews} />

        <br></br>
        <br></br>
        <ReviewForm onAddReview={addReview} artistId={id} />
      </div>
      <br></br>
      <br></br>
      <h5>Upcoming Events:</h5>
      {events ? (
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
        <p>No upcoming events found for this artist.</p>
      )}
    </div>
  );
}

export default ArtistDetail;
