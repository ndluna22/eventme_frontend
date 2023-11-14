import React, { useState, useEffect, useContext } from "react";
import EventApi from "../api/api";
import FavoriteCard from "./FavoriteCard";
import LoadingSpinner from "../common/LoadingSpinner";
import UserContext from "../auth/UserContext";

function FavoriteList() {
  console.debug("FavoriteList");
  const [favorites, setFavorites] = useState([]);

  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    getFavorites();
  }, []);

  async function getFavorites() {
    try {
      const allFavorites = await EventApi.getFavorites(currentUser.username);
      console.log("Favorites API Response:", allFavorites);
      setFavorites(allFavorites);
    } catch (error) {
      console.error("Error while fetching favorites:", error);
      setFavorites([]);
    }
  }

  if (!favorites) return <LoadingSpinner />;

  return (
    <div className="FavoriteList col-md-8 offset-md-2">
      <div className="FavoriteList-list">
        {favorites.map((f) => (
          <FavoriteCard
            key={f.artist_id}
            id={f.artist_id}
            name={f.artist_name}
            images={f.artist_image}
          />
        ))}
      </div>
    </div>
  );
}

export default FavoriteList;
