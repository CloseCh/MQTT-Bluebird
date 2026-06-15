import { IconButton, Tooltip, Box } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import WifiOffIcon from '@mui/icons-material/WifiOff';
import { LIVE_ACCENT } from '@/theme';
import { useStatusButton } from './useStatusButton';

export function StatusButton() {
  const {
    tooltipTitle,
    isConnected,
    status,
    isDisconnecting,
    onClick,
  } = useStatusButton();

  const color = isConnected ? 'success' : status === 'error' ? 'error' : 'default';

  return (
    <Tooltip title={tooltipTitle} arrow>
      <Box display='inline-flex' position='relative'>
        <IconButton
          onClick={() => void onClick()}
          disabled={isDisconnecting}
          size='small'
          aria-label={isConnected ? 'Desconectar MQTT' : 'Ir al login'}
          color={color}
          sx={isConnected ? { color: LIVE_ACCENT, '&:hover': { color: LIVE_ACCENT } } : undefined}
        >
          {isConnected ? <WifiIcon /> : <WifiOffIcon />}
        </IconButton>
      </Box>
    </Tooltip>
  );
}

export default StatusButton;
