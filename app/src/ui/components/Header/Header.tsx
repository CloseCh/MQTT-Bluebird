import {
  Box,
  Typography,
  AppBar,
  Toolbar
} from "@mui/material";

export default function Header() {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="sticky">
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              MQTTC
            </Typography>
          </Toolbar>
        </AppBar>
    </Box>
  );
}