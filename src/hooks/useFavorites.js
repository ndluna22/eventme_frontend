import { useEffect, useContext } from "react";
import EventApi from "../api/api";
import UserContext from "../auth/UserContext";
import useLocalStorage from "./useLocalStorage";

function useFavorites(itemType, initialItems) {
  const { currentUser } = useContext(UserContext);
  const [favoriteItems, setFavoriteItems] = useLocalStorage(
    `favorite${itemType}s`,
    initialItems
  );

  useEffect(() => {
    // When the component mounts, initialize favoriteItems state with the value from local storage
    const storedFavorites = localStorage.getItem(`favorite${itemType}s`);
    setFavoriteItems(storedFavorites ? storedFavorites.split(",") : []);
  }, [setFavoriteItems, itemType]);

  const isItemFavorited = (artistData) => favoriteItems.includes(artistData);

  const handleFavoriteClick = async (itemId, itemDetails) => {
    try {
      if (!currentUser || !currentUser.username) {
        console.error("Current user data is missing or incomplete.");
        return;
      }

      const data = {
        [`${itemType}Id`]: itemId,
        ...itemDetails,
      };

      await EventApi.addFavorite(currentUser.username, itemId, data);

      setFavoriteItems((prevFavoriteItems) => [...prevFavoriteItems, itemId]);
    } catch (error) {
      console.error(`Error favoriting ${itemType}:`, error);
    }
  };

  const handleRemoveFavorite = async (itemId) => {
    try {
      if (!currentUser || !currentUser.username) {
        console.error("Current user data is missing or incomplete.");
        return;
      }

      await EventApi.deleteFavorite(currentUser.username, itemId);

      setFavoriteItems((prevFavoriteItems) =>
        prevFavoriteItems.filter((id) => id !== itemId)
      );
    } catch (error) {
      console.error(`Error removing favorite ${itemType}:`, error);
    }
  };

  return {
    favoriteItems,
    isItemFavorited,
    handleFavoriteClick,
    handleRemoveFavorite,
  };
}

export default useFavorites;
