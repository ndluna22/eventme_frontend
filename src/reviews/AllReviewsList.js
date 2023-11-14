import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import EventApi from "../api/api";
import UserContext from "../auth/UserContext";
import ReviewCard from "./ReviewCard";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container } from "@mui/system";

function AllReviewsList() {
  const { id } = useParams();
  console.debug("AllReviewsList", "id=", id);
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // Fetch reviews for the current user
        const allUserReviews = await EventApi.getReviewsByArtistId(id);
        setReviews(allUserReviews);
      } catch (error) {
        console.error("Error while fetching reviews:", error);
      }
    }

    fetchReviews();
  }, [currentUser, id]); // Include id as a dependency

  return (
    <div className="AllReviewsList col-md-8 offset-md-2">
      {!reviews ? (
        <p>No Reviews</p>
      ) : reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="col-md-8 offset-md-2">
          {reviews.map((review) => (
            <div key={review.artist_id}>
              <ReviewCard
                artist_id={review.artist_id}
                artist_name={review.artist_name}
                comment={review.comment}
                created={review.created_at}
                username={review.user_id}
                pageType="AllReviewsList" // Pass the page type as a prop
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllReviewsList;
