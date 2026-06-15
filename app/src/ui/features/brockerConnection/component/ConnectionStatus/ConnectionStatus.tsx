import { Box, Typography } from '@mui/material';
import { LIVE_ACCENT } from '@/theme';
import { useConnectionContext } from '../../context/ConnectionProvider';

type Visual = {
  label: string;
  borderColor: string;
  bgcolor: string;
  dotColor: string;
  textColor: string;
  glow: boolean;
  opacity: number;
};

const CONNECTED: Visual = {
  label: 'Conectado',
  borderColor: 'success.main',
  bgcolor: 'success.dark',
  dotColor: 'success.light',
  textColor: 'success.light',
  glow: true,
  opacity: 1,
};

const LOST: Visual = {
  label: 'Conexión perdida',
  borderColor: 'error.main',
  bgcolor: 'error.dark',
  dotColor: 'error.light',
  textColor: 'error.light',
  glow: false,
  opacity: 1,
};

const DISCONNECTED: Visual = {
  label: 'Desconectado',
  borderColor: 'grey.600',
  bgcolor: 'grey.800',
  dotColor: 'grey.500',
  textColor: 'grey.400',
  glow: false,
  opacity: 0.6,
};

export function ConnectionStatus() {
  const { status } = useConnectionContext();

  const visual = status === 'connected'
    ? CONNECTED
    : status === 'error'
      ? LOST
      : DISCONNECTED;

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 0.75,
        px: 1.5,
        py: 0.4,
        borderRadius: '999px',
        border: '1px solid',
        borderColor: visual.borderColor,
        bgcolor: visual.bgcolor,
        opacity: visual.opacity,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: visual.dotColor,
          boxShadow: visual.glow ? `0 0 6px ${LIVE_ACCENT}` : 'none',
        }}
      />
      <Typography variant='caption' fontWeight={600} color={visual.textColor}>
        {visual.label}
      </Typography>
    </Box>
  );
}
