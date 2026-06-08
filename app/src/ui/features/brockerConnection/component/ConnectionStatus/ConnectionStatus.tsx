import { Box, Typography } from '@mui/material';
import { useConnectionContext } from '../../hooks/useConnectionContext';

export function ConnectionStatus() {
  const { isConnected } = useConnectionContext();

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
        borderColor: isConnected ? 'success.main' : 'grey.600',
        bgcolor: isConnected ? 'success.dark' : 'grey.800',
        opacity: isConnected ? 1 : 0.6,
      }}
    >
      <Box
        sx={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          bgcolor: isConnected ? 'success.light' : 'grey.500',
          boxShadow: isConnected ? '0 0 6px #00e676' : 'none',
        }}
      />
      <Typography variant='caption' fontWeight={600} color={isConnected ? 'success.light' : 'grey.400'}>
        {isConnected ? 'Conectado' : 'Desconectado'}
      </Typography>
    </Box>
  );
}
