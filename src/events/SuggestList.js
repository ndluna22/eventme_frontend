import React from "react";
import { Link } from "react-router-dom";
import SuggestCard from "./SuggestCard";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";

export function SuggestList({ suggest }) {
  return (
    <ImageList
      sx={{ width: "80%", height: "auto", mx: "auto" }}
      variant="woven"
      cols={3}
      gap={8}
    >
      {suggest.map((item) => (
        <Link key={item.images} to={`/events/${item.id}`}>
          <ImageListItem>
            <img
              srcSet={`${item.images}?w=248&fit=crop&auto=format&dpr=2 2x`}
              src={`${item.images}?w=248&fit=crop&auto=format`}
              alt={item.name}
              loading="lazy"
            />
            <ImageListItemBar title={item.name} subtitle={item.name} />
          </ImageListItem>
        </Link>
      ))}
    </ImageList>
  );
}

export default SuggestList;
