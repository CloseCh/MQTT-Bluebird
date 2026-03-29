import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon
} from "@mui/material";
import { DRAWER_WIDTH, navItems } from "../../constants/navbarConstants";
import { useNavigationContext } from "../../hooks/useNavigationContext";


export function NavBar() {
  const { windowOpenList, openWindow } = useNavigationContext();

  const handleClick = (label:string) => {
    openWindow(label);
  }

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
                  onClick={() => handleClick(item.label)}
                  selected={windowOpenList.has(item.label)}
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