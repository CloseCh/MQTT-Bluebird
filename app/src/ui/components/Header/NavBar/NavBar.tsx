import { useState } from 'react';

import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemButton from '@mui/material/ListItemButton';

import MenuIcon from '@mui/icons-material/Menu';

import { useNavigate } from "react-router";

import { navBarStyles } from './styles.js';
import { navbarItems } from './consts/navbarItems.js';

export default function NavBar() {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
      <List>
        {navbarItems.map( item => (
          <ListItem 
            key={ item.id } 
            disablePadding
            onClick={() => navigate(item.route)}
          >
            <ListItemButton>
              <ListItemIcon
                sx={navBarStyles.icons}
              >
                { item.icon }
              </ ListItemIcon>
              <ListItemText
                sx={navBarStyles.text}
                primary={item.label}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon 
          sx={navBarStyles.icons}
        />
      </IconButton>
      
      <Drawer 
        sx={navBarStyles.drawer}
        open={open} 
        onClose={toggleDrawer(false)}
      >
        {DrawerList}
      </Drawer>
    </div>
  );
}