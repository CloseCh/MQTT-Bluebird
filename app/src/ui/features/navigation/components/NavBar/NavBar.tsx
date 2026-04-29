import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon
} from "@mui/material";
import { DRAWER_WIDTH, navItems } from "../../constants/navbarConstants";
import { useNavigationContext } from "../../hooks/useNavigationContext";
import SettingsIcon from "@mui/icons-material/Settings";

export function NavBar() {
  const { barOpen, handleItemBarClick } = useNavigationContext();

  const handleClick = (barItemlabel: string) => {
    handleItemBarClick(barItemlabel);
  }

  const barStyle = {
    width: DRAWER_WIDTH,
    height: '100%',
    flexShrink: 0,
    "& .MuiDrawer-paper": {
      width: DRAWER_WIDTH,
      boxSizing: "border-box",
      position: "relative",
    }
  }

  return (
    <Box>
      <Drawer
        variant="permanent"
        sx={barStyle}
      >
        <Box sx={{ flex: 1, overflowY: "auto", p: 1 }}>
          <List disablePadding>
            {navItems.map((item, index) => (
              <Box key={index}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={() => handleClick(item.label)}
                    selected={item.label === barOpen}
                    sx={{ borderRadius: 2, mb: 0.5, justifyContent: "center" }}
                  >
                    <ListItemIcon sx={{ minWidth: 0, minHeight: 0 }}>
                      {item.icon}
                    </ListItemIcon>
                  </ListItemButton>
                </ListItem>
                {item.dividerAfter && <Divider sx={{ my: 0.5 }} />}
              </Box>
            ))}
          </List>
        </Box>

        <Box sx={{ p: 1 }}>
          <Divider sx={{ mb: 0.5 }} />
          <ListItemButton sx={{ borderRadius: 2, justifyContent: "center" }}>
            <ListItemIcon sx={{ minWidth: 0, minHeight: 0 }}>
              <SettingsIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
          </ListItemButton>
        </Box>
      </Drawer>
    </Box>
  );
}