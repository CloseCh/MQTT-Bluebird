import { IconButton, Tooltip, Box } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import { useStatusButton } from "./useStatusButton";

export function StatusButton() {
  const {
    tooltipTitle,
    isConnected,
    isDisconnecting,
    onDisconnect
  } = useStatusButton();

  return (
    <Tooltip title={tooltipTitle} arrow>
      <Box display="inline-flex" position="relative">
        <IconButton
          onClick={onDisconnect}
          disabled={!isConnected || isDisconnecting}
          size="small"
          aria-label={isConnected ? "Desconectar MQTT" : "MQTT desconectado"}
          color={isConnected ? "success" : "default"}
          sx={isConnected ? { color: "#00e676", "&:hover": { color: "#00e676" } } : undefined}
        >
          <WifiIcon />
        </IconButton>
      </Box>
    </Tooltip>
  );
}

export default StatusButton;