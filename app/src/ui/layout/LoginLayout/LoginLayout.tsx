import { Outlet } from 'react-router';

import { Box, Paper, Stack, Typography } from '@mui/material';
import { LIVE_ACCENT } from '@/theme';

export default function LoginLayout() {
  return (
    <Stack direction='row' sx={{ height: '100vh', width: '100vw' }}>

      {/* Mitad izquierda: panel de marca */}
      <Box
        sx={{
          flex: '1 1 50%',
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
        <Box
          sx={{
            width: 14,
            height: 14,
            borderRadius: '50%',
            bgcolor: LIVE_ACCENT,
            boxShadow: `0 0 12px ${LIVE_ACCENT}`,
          }}
        />
        <Typography variant='h4' fontWeight={700}>
          MQTT Bluebird
        </Typography>
        <Typography variant='body2' sx={{ opacity: 0.8 }}>
          Cliente de comunicación MQTT
        </Typography>
      </Box>

      {/* Mitad derecha: conexión — siempre ocupa la misma mitad de la pantalla */}
      <Box
        sx={{
          flex: '1 1 50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          p: 4,
          overflowY: 'auto',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: '80%',
            maxWidth: 560,
            p: 4,
          }}
        >
          <Outlet />
        </Paper>
      </Box>

    </Stack>
  );
}
