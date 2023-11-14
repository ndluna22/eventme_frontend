import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./VenueCard.css";
import AspectRatio from "@mui/joy/AspectRatio";
import Button from "@mui/joy/Button";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";

function VenueCard({ id, name, images, city, state }) {
  console.debug("VenueCard", name);

  return (
    <Card sx={{ width: 300 }}>
      <div>
        <Typography level="title-lg">{name}</Typography>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img src={images} srcSet={images} loading="lazy" alt="" />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Location:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            {city}, {state}
          </Typography>
        </div>

        <Link to={`/venues/${id}`}>
          <Button
            variant="solid"
            size="md"
            color="primary"
            aria-label="Explore Venue"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          >
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default VenueCard;
