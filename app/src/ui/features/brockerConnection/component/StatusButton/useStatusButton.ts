import { useCallback, useState } from 'react';
import { useConnectionContext } from '../../hooks/useConnectionContext';

export function useStatusButton() {
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
    ? 'Desconectando…'
    : isConnected
      ? `Conectado a ${connectedEndpoint} — clic para desconectar`
      : 'Sin conexión MQTT';

  return {
    isConnected,
    isDisconnecting,
    tooltipTitle,
    onDisconnect
  }
}