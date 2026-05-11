import {
  Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import { DRAWER_WIDTH } from '../../constants/navbarConstants';
import { useNavItems } from './useNavItems';
import { useNavigationStore } from '../../stores/navigationStore';
import { useNavigate } from 'react-router';

export function NavBar() {
  const navItems = useNavItems();
  const { settingsOpen, toggleSettings, monitorOpen, toggleMonitor } = useNavigationStore();
  const navigate = useNavigate();

  const handleSettings = () => {
    toggleSettings();
    navigate(settingsOpen ? '/' : '/settings');
  };

  const handleMonitor = () => {
    toggleMonitor();
    navigate(monitorOpen ? '/' : '/monitor');
  };

  const barStyle = {
    width: DRAWER_WIDTH,
    height: '100%',
    flexShrink: 0,
    '& .MuiDrawer-paper': {
      width: DRAWER_WIDTH,
      boxSizing: 'border-box',
      position: 'relative',
    },
  };

  return (
    <Box>
      <Drawer variant='permanent' sx={barStyle}>
        <Box sx={{ flex: 1, overflowY: 'auto', p: 1 }}>
          <List disablePadding>
            {navItems.map((item) => (
              <Box key={item.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    onClick={item.onClick}
                    selected={item.selected}
                    sx={{ borderRadius: 2, mb: 0.5, justifyContent: 'center' }}
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
          <ListItemButton
            onClick={handleMonitor}
            selected={monitorOpen}
            sx={{ borderRadius: 2, mb: 0.5, justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ minWidth: 0, minHeight: 0 }}>
              <QueryStatsIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
          </ListItemButton>
          <ListItemButton
            onClick={handleSettings}
            selected={settingsOpen}
            sx={{ borderRadius: 2, justifyContent: 'center' }}
          >
            <ListItemIcon sx={{ minWidth: 0, minHeight: 0 }}>
              <SettingsIcon sx={{ fontSize: 30 }} />
            </ListItemIcon>
          </ListItemButton>
        </Box>
      </Drawer>
    </Box>
  );
}
