import {
  Box,
  IconButton,
  Stack,
  Tooltip,
  Typography,
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
              <Typography variant='caption' sx={{ fontWeight: item.selected ? 600 : 400 }}>
                {item.label}
              </Typography>
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
}
