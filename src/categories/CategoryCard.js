import React from "react";
import { Link } from "react-router-dom";
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

function CategoryCard({ id, name, images, category, startDate, city, state }) {
  console.debug("CategoryCard", name);

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
          <Typography fontSize="lg" fontWeight="lg">
            {category}
          </Typography>
          <Typography level="body-sm">Date: {startDate}</Typography>
          <Typography level="body-sm">
            {city}, {state}
          </Typography>
        </div>
        <Link to={`/events/${id}`}>
          <Button
            variant="solid"
            size="md"
            color="primary"
            sx={{ ml: "auto", alignSelf: "center", fontWeight: 600 }}
          >
            Explore
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default CategoryCard;
