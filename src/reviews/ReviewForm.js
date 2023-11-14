import React, { useState, useContext } from "react";
import EventApi from "../api/api";
import UserContext from "../auth/UserContext";
import { useNavigate } from "react-router-dom";
import Box from "@mui/joy/Box";
import Button from "@mui/joy/Button";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Textarea from "@mui/joy/Textarea";
import IconButton from "@mui/joy/IconButton";
import Menu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import ListItemDecorator from "@mui/joy/ListItemDecorator";
import FormatBold from "@mui/icons-material/FormatBold";
import FormatItalic from "@mui/icons-material/FormatItalic";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Check from "@mui/icons-material/Check";

function ReviewForm({ onAddReview, artistId }) {
  const [comment, setComment] = useState("");
  const { currentUser } = useContext(UserContext);
  const [italic, setItalic] = React.useState(false);
  const [fontWeight, setFontWeight] = React.useState("normal");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!currentUser || !currentUser.username || !artistId) {
        console.error(
          "Current user data or artistId is missing or incomplete."
        );
        return;
      }

      const created_at = new Date();

      const data = {
        comment: comment,
        created_at: created_at.toLocaleDateString(),
      };

      console.log("Review Data:", data);
      const response = await EventApi.addReview(
        currentUser.username,
        artistId,
        data
      );

      console.log("API Response:", response);

      if (response.added) {
        const newReview = response.review; // Adjust this based on your response structure

        onAddReview(newReview);

        setComment("");

        // Refresh the page
        // Update the URL with the current page and total pages
        navigate(`/artists/${artistId}`);
      } else {
        console.error("Review not added successfully");
      }
    } catch (error) {
      console.error("Error in try block:", error);
      // Handle errors, if necessary
    }
  };

  return (
    <FormControl>
      <FormLabel>Add a Review:</FormLabel>
      <Textarea
        placeholder="Type something here…"
        minRows={3}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        endDecorator={
          <Box
            sx={{
              display: "flex",
              gap: "var(--Textarea-paddingBlock)",
              pt: "var(--Textarea-paddingBlock)",
              borderTop: "1px solid",
              borderColor: "divider",
              flex: "auto",
            }}
          >
            <IconButton
              variant="plain"
              color="neutral"
              onClick={(event) => setAnchorEl(event.currentTarget)}
            >
              <FormatBold />
              <KeyboardArrowDown fontSize="md" />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={() => setAnchorEl(null)}
              size="sm"
              placement="bottom-start"
              sx={{ "--ListItemDecorator-size": "24px" }}
            >
              {["200", "normal", "bold"].map((weight) => (
                <MenuItem
                  key={weight}
                  selected={fontWeight === weight}
                  onClick={() => {
                    setFontWeight(weight);
                    setAnchorEl(null);
                  }}
                  sx={{ fontWeight: weight }}
                >
                  <ListItemDecorator>
                    {fontWeight === weight && <Check fontSize="sm" />}
                  </ListItemDecorator>
                  {weight === "200" ? "lighter" : weight}
                </MenuItem>
              ))}
            </Menu>
            <IconButton
              variant={italic ? "soft" : "plain"}
              color={italic ? "primary" : "neutral"}
              aria-pressed={italic}
              onClick={() => setItalic((bool) => !bool)}
            >
              <FormatItalic />
            </IconButton>
            <Button sx={{ ml: "auto" }} onClick={handleSubmit}>
              Submit Review
            </Button>
          </Box>
        }
        sx={{
          minWidth: 300,
          fontWeight,
          fontStyle: italic ? "italic" : "initial",
        }}
      />
    </FormControl>
  );
}

export default ReviewForm;
