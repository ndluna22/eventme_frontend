import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function LoadingSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh", // 100% of the viewport height
      }}
    >
      <CircularProgress />
      Loading ...
    </Box>
  );
}

/** Loading message used by components that fetch API data. */

// function LoadingSpinner() {
//   return (
//       <div className="LoadingSpinner">
//         Loading ...
//       </div>
//   );
// }

export default LoadingSpinner;
