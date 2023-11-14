import React from "react";
import { Link } from "react-router-dom";

import "./SuggestCard.css";

/** Show limited information about an event
 *
 * Is rendered by EventList to show a "card" for each event.
 *
 * EventList -> EventCard
 */

function SuggestCard({ suggest }) {
  return (
    <Link className="EventCard card" to={`/events/${suggest.id}`}>
      <div className="card-body">
        <h6 className="card-title">
          {suggest.name}
          {
            <img
              src={suggest.images}
              alt={suggest.name}
              className="float-right ml-5"
            />
          }
        </h6>
        {/* <p>
          <small>{startDate}</small>
          <br></br>
          <small>{genre}</small>
        </p> */}
      </div>
    </Link>
  );
}

export default SuggestCard;
