import React, { useContext, useEffect, useState } from "react";
import UserContext from "../auth/UserContext";
import EventApi from "../api/api";
import SuggestList from "../events/SuggestList";

function Homepage() {
  const { currentUser } = useContext(UserContext);
  const [suggestedEvents, setSuggestedEvents] = useState([]);
  console.debug("Homepage", "currentUser=", currentUser);

  useEffect(() => {
    async function fetchSuggestedEvents() {
      try {
        const suggested = await EventApi.getSuggestions();
        setSuggestedEvents(suggested);
      } catch (error) {
        console.error("Error fetching suggested events:", error);
      }
    }

    fetchSuggestedEvents();
  }, []);

  return (
    <div className="Homepage">
      <div className="container text-center">
        <h1>Welcome to the Event App</h1>
        {currentUser ? (
          <h2>
            Welcome Back, {currentUser.firstName || currentUser.username}!
          </h2>
        ) : (
          <p>
            You can log in or sign up to get personalized event recommendations.
          </p>
        )}
      </div>
      <div>
        <SuggestList suggest={suggestedEvents} />
      </div>
    </div>
  );
}

export default Homepage;
