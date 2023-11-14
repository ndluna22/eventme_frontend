import React from "react";
import { Link } from "react-router-dom";

import "./FavoriteCard.css";

/** Show limited information about a company
 *
 * Is rendered by FavoriteList to show a "card" for each favorite artist.
 *
 * Favoritelist -> FavoriteCard
 */

function FavoriteCard({ id, name, images }) {
  console.debug("FavoriteCard", name);

  return (
    <Link className="FavoriteCard card" to={`/artists/${id}`}>
      <div className="card-body">
        <h6 className="card-title">
          {name}
          {<img src={images} alt={name} className="float-right ml-5" />}
        </h6>
        <p>{/* <small>{}</small> */}</p>
      </div>
    </Link>
  );
}

export default FavoriteCard;
