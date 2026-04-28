import { useState, useCallback } from "react";
import { IconButton, Tooltip, CircularProgress, Box } from "@mui/material";
import WifiIcon from "@mui/icons-material/Wifi";
import WifiOffIcon from "@mui/icons-material/WifiOff";
import { useConnectionContext } from "../../hooks";

export function StatusButton() {
  const { isConnected, connectedEndpoint, handleDisconnection } =
    useConnectionContext();

  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const onDisconnect = useCallback(async () => {
    if (!isConnected || isDisconnecting) return;
    setIsDisconnecting(true);
    try {
      await handleDisconnection();
    } finally {
      setIsDisconnecting(false);
    }
  }, [isConnected, isDisconnecting, handleDisconnection]);

  const tooltipTitle = isDisconnecting
    ? "Desconectando…"
    : isConnected
    ? `Conectado a ${connectedEndpoint} — clic para desconectar`
    : "Sin conexión MQTT";

  return (
    <Tooltip title={tooltipTitle} arrow>
      {/* Box wrapper needed so Tooltip works on disabled IconButton */}
      <Box display="inline-flex" position="relative">
        <IconButton
          onClick={onDisconnect}
          disabled={!isConnected || isDisconnecting}
          size="small"
          aria-label={isConnected ? "Desconectar MQTT" : "MQTT desconectado"}
          color={isConnected ? "success" : "default"}
        >
          {isConnected ? <WifiIcon /> : <WifiOffIcon />}
        </IconButton>

        {/* Pulsing ring while connected */}
        {isConnected && !isDisconnecting && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              border: "2px solid",
              borderColor: "success.main",
              opacity: 0.4,
              animation: "mqtt-pulse 2s ease-out infinite",
              pointerEvents: "none",
              "@keyframes mqtt-pulse": {
                "0%":   { transform: "scale(0.85)", opacity: 0.5 },
                "70%":  { transform: "scale(1.3)",  opacity: 0   },
                "100%": { transform: "scale(0.85)", opacity: 0   },
              },
            }}
          />
        )}

        {/* Spinner overlay while disconnecting */}
        {isDisconnecting && (
          <CircularProgress
            size={32}
            thickness={2}
            color="error"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              mt: "-16px",
              ml: "-16px",
              pointerEvents: "none",
            }}
          />
        )}
      </Box>
    </Tooltip>
  );
}

export default StatusButton;