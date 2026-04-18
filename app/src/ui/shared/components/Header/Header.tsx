import {
  Box,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";

interface Prop {
  title: string;
}

export default function Header({title}: Prop) {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              {title}
            </Typography>
          </Toolbar>
        </AppBar>
    </Box>
  );
}