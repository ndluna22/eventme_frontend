import React from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import Stack from "@mui/material/Stack";

export function ButtonsStyles({ text, color, icon, onClick }) {
  return (
    <Box sx={{ "& button": { m: 1 } }}>
      <div>
        <Button
          variant="contained"
          size="medium"
          style={{ backgroundColor: color }}
          onClick={onClick}
        >
          {icon} {text}
        </Button>
      </div>
    </Box>
  );
}

export function IconLabelButtons({ text, onClick }) {
  return (
    <Stack direction="row" spacing={2}>
      <Button variant="outlined" startIcon={<DeleteIcon />} onClick={onClick}>
        {text}
      </Button>
      {/* <Button variant="contained" endIcon={<SendIcon />}>
        {text}
      </Button> */}
    </Stack>
  );
}

export default { ButtonsStyles, IconLabelButtons };
