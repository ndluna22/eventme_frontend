import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import EventApi from "../api/api";
import UserContext from "../auth/UserContext";
import { Alert } from "../common/Alert";
import "./ReviewCard.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

function ReviewCard({
  comment,
  artist_id,
  username,
  created,
  onRemoveReview,
  pageType,
}) {
  console.debug("ReviewCard", comment);

  const { currentUser } = useContext(UserContext);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [artistDetails, setArtistDetails] = useState({
    name: "",
    images: "", // Assuming the image URL is a string
  });
  const navigate = useNavigate();

  const formattedDateTime = new Date(created).toLocaleString("en-US", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  useEffect(() => {
    const fetchArtistDetails = async () => {
      try {
        if (artist_id) {
          const artistDetails = await EventApi.getArtistById(artist_id);
          setArtistDetails(artistDetails);
        }
      } catch (error) {
        console.error("Error fetching artist details:", error);
        // Handle errors, if necessary
      }
    };

    fetchArtistDetails();
  }, [artist_id]);

  const handleRemoveReview = async () => {
    try {
      if (!currentUser || !currentUser.username || !artist_id) {
        console.error(
          "Current user data or artist_id is missing or incomplete."
        );
        return;
      }
      await EventApi.deleteReview(currentUser.username, artist_id);

      // Trigger the callback function to reflect the removal in the parent component
      onRemoveReview();

      // Show the confirmation dialog
      setShowConfirmation(true);

      navigate(`/artists/${artist_id}`);
    } catch (error) {
      console.error("Error removing review:", error);
      // Handle errors, if necessary
    }
  };

  useEffect(() => {
    const fetchReviewData = async () => {
      try {
        const reviewData = await EventApi.getReviewById(artist_id);
      } catch (error) {
        console.error("Error fetching review data:", error);
        // Handle errors, if necessary
      }
    };

    fetchReviewData();
  }, [artist_id]);

  return (
    <div className="card">
      <h5 className="card-header">@{username}</h5>

      <div className="card-body">
        <p className="card-text">{comment}</p>
        <p>
          <small style={{ marginBottom: "10px" }}>{formattedDateTime}</small>
        </p>

        <Stack spacing={2} direction="row">
          <Button variant="contained" onClick={handleRemoveReview}>
            Remove Review
          </Button>

          {pageType === "ReviewList" && (
            <>
              <Link to={`/artists/${artist_id}`}>
                <Button variant="contained">View Artist Page</Button>
              </Link>
            </>
          )}
        </Stack>
      </div>
    </div>
  );
}

export default ReviewCard;
