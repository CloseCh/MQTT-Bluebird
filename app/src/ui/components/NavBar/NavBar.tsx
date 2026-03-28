import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon
} from "@mui/material";

import {
  Dataset,
  Publish,
  Subscriptions
} from "@mui/icons-material"
const DRAWER_WIDTH = 60;

const navItems = [
  { id: 1, label: 'Dashboard', icon: <Dataset sx={{ fontSize: 30 }}/> },
  { id: 2, label: 'Publish', icon: <Publish sx={{ fontSize: 30 }}/> },
  { id: 3, label: 'subscribe', icon: <Subscriptions sx={{ fontSize: 30 }}/> }
]

export default function NavBar() {
  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          height: '100%',
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: DRAWER_WIDTH,
            boxSizing: "border-box",
            position: "relative",
          }
        }}
      >
        <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
          <List disablePadding>
            {navItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{ borderRadius: 2, mb: 0.5, justifyContent: "center" }}
                >
                  <ListItemIcon sx={{ minWidth: 0, minHeight: 0 }}>
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </Box>
  );
}