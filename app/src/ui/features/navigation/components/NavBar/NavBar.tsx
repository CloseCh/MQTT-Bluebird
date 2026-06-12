import {
  Box,
  IconButton,
  Stack,
  Tooltip,
} from '@mui/material';

import { useNavItems } from './useNavItems';

export function NavBar() {
  const navItems = useNavItems();

  return (
    <Box
      sx={{
        width: '100%',
        borderBottom: 1,
        borderColor: 'divider',
        bgcolor: 'background.paper',
        flexShrink: 0,
      }}
    >
      <Stack direction='row' alignItems='center' spacing={2} sx={{ px: 1, py: 0.5 }}>
        {navItems.map((item) => (
          <Tooltip key={item.id} title={item.label}>
            <IconButton
              onClick={item.onClick}
              color={item.selected ? 'primary' : 'default'}
              size='small'
              sx={{
                borderRadius: 1,
                px: 1.5,
                py: 0.75,
                gap: 0.75,
                bgcolor: item.selected ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {item.icon}
              <Box component='span' sx={{ fontSize: '0.75rem', fontWeight: item.selected ? 600 : 400 }}>
                {item.label}
              </Box>
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
}
