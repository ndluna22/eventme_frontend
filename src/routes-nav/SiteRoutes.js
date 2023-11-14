import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Homepage from "../homepage/Homepage";
import EventList from "../events/EventList";
import EventDetail from "../events/EventDetail";
import VenueList from "../venues/VenueList";
import VenueDetail from "../venues/VenueDetail";
import ArtistList from "../artists/ArtistList";
import ArtistDetail from "../artists/ArtistDetail";
import CategoryList from "../categories/CategoryList";
import LoginForm from "../auth/LoginForm";
import ReviewList from "../reviews/ReviewList";
import FavoriteList from "../favorites/FavoriteList";
import SearchPage from "../common/Search";
import SignupForm from "../auth/SignupForm";
import ProfileForm from "../profiles/ProfileForm";
import PrivateRoute from "./PrivateRoute";

function SiteRoutes({ login, signup }) {
  console.debug(
    "SiteRoutes",
    `login=${typeof login}`,
    `signup=${typeof signup}`
  );

  // function NotFound() {
  //   return (
  //     <div>
  //       <h1>404 - Not Found</h1>
  //       <p>Sorry, the page you are looking for does not exist.</p>
  //     </div>
  //   );
  // }

  return (
    <div className="pt-5">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route
          path="/events"
          element={
            <PrivateRoute>
              <EventList />
            </PrivateRoute>
          }
        />

        <Route
          path="/events/:id"
          element={
            <PrivateRoute>
              <EventDetail />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/venues"
          element={
            <PrivateRoute>
              <VenueList />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/venues/:id"
          element={
            <PrivateRoute>
              <VenueDetail />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/artists"
          element={
            <PrivateRoute>
              <ArtistList />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/artists/:id"
          element={
            <PrivateRoute>
              <ArtistDetail />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/categories/:categoryName"
          element={
            <PrivateRoute>
              <CategoryList />
            </PrivateRoute>
          }
        />

        <Route
          path="profile"
          element={
            <PrivateRoute>
              <ProfileForm />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/search"
          element={
            <PrivateRoute>
              <SearchPage />{" "}
            </PrivateRoute>
          }
        />

        <Route
          path="/users/:username/reviews"
          element={
            <PrivateRoute>
              <ReviewList />{" "}
            </PrivateRoute>
          }
        />
        <Route
          path="/users/:username/favorites"
          element={
            <PrivateRoute>
              <FavoriteList />{" "}
            </PrivateRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default SiteRoutes;
