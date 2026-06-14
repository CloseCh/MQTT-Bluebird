import { IconButton, Tooltip, Box } from '@mui/material';
import WifiIcon from '@mui/icons-material/Wifi';
import { LIVE_ACCENT } from '@/theme';
import { useStatusButton } from './useStatusButton';

export function StatusButton() {
  const {
    tooltipTitle,
    isConnected,
    isDisconnecting,
    onDisconnect
  } = useStatusButton();

  return (
    <Tooltip title={tooltipTitle} arrow>
      <Box display='inline-flex' position='relative'>
        <IconButton
          onClick={() => void onDisconnect()}
          disabled={!isConnected || isDisconnecting}
          size='small'
          aria-label={isConnected ? 'Desconectar MQTT' : 'MQTT desconectado'}
          color={isConnected ? 'success' : 'default'}
          sx={isConnected ? { color: LIVE_ACCENT, '&:hover': { color: LIVE_ACCENT } } : undefined}
        >
          <WifiIcon />
        </IconButton>
      </Box>
    </Tooltip>
  );
}

export default StatusButton;