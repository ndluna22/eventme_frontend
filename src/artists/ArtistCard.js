import React from "react";
import { Link } from "react-router-dom";
import "./ArtistCard.css";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

/** Show limited information about an event
 *
 * Is rendered by EventList to show a "card" for each event.
 *
 * EventList -> EventCard
 */

function ArtistCard({ id, name, images, category }) {
  console.debug("ArtistCard", name);

  return (
    <Card sx={{ width: 300 }}>
      <div>
        <Typography level="title-lg">{name}</Typography>
        <Typography level="body-sm"></Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={images} srcSet={images} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Category:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {category}
          </Typography>
        </div>
        <Link to={`/artists/${id}`}>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Bahamas Islands"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          >
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default ArtistCard;
