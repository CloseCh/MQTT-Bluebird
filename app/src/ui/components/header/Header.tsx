import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBar from './navBar/NavBar.js';

export default function Header() {
  return (
    <>
      <AppBar position="sticky">
        <Toolbar variant="dense">
          <NavBar />
          <Typography variant="h6" color="inherit" component="div">
            MQTTC
          </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}
