import { Outlet } from 'react-router';

import { 
  Box, 
  Paper, 
  Stack, 
  Typography
} from '@mui/material';

export default function LoginLayout() {
  return (
    <Stack direction='row' sx={{ height: '100%', width: '100%' }}>

      <Box
        sx={{
          width: '40%',
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          background: (theme) =>
            `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
          color: 'common.white',
        }}
      >
        <Typography variant='h4' fontWeight={700}>
          MQTT Bluebird
        </Typography>
        <Typography variant='body2' sx={{ opacity: 0.8 }}>
          Aplicación de mensajería MQTT
        </Typography>
      </Box>

      <Box
        sx={{
          flex: '1 1 30%',
          alignItems: 'center',
          justifyContent: 'center',
          overflowY: 'auto',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '100%',
            height: '100%',
            p: 4,
          }}
        >
          <Outlet />
        </Paper>
      </Box>
    </Stack>
  );
}
