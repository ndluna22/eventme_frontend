import React, { useState, useEffect, useContext } from "react";
import EventApi from "../api/api";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";
import ReviewCard from "./ReviewCard";

function ReviewList() {
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    async function fetchReviews() {
      try {
        // Fetch reviews for the current user
        const userReviews = await EventApi.getReviews(currentUser.username);
        setReviews(userReviews);
      } catch (error) {
        console.error("Error while fetching reviews:", error);
      }
    }

    fetchReviews();
  }, [currentUser]);

  if (!reviews) return <LoadingSpinner />;

  return (
    <div className="ReviewList col-md-8 offset-md-2">
      <h4>Reviews:</h4>
      {reviews.length === 0 ? (
        <p>No reviews found.</p>
      ) : (
        <div className="col-md-8 offset-md-2">
          {reviews.map((review) => (
            <div key={review.artist_id}>
              <ReviewCard
                artist_id={review.artist_id}
                username={review.user_id}
                comment={review.comment}
                created={review.created_at}
                pageType="ReviewList"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ReviewList;
