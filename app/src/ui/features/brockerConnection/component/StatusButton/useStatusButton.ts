import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router';
import { useConnectionContext } from '../../context/ConnectionProvider';

export function useStatusButton() {
  const { isConnected, status, connectedEndpoint, handleDisconnection } =
    useConnectionContext();
  const navigate = useNavigate();

  const [isDisconnecting, setIsDisconnecting] = useState(false);

  const onClick = useCallback(async () => {
    if (isDisconnecting) return;
    // Conectado: el clic desconecta. Sin conexión: lleva al login para reconectar.
    if (isConnected) {
      setIsDisconnecting(true);
      try {
        await handleDisconnection();
      } finally {
        setIsDisconnecting(false);
      }
      return;
    }
    void navigate('/login');
  }, [isConnected, isDisconnecting, handleDisconnection, navigate]);

  const tooltipTitle = isDisconnecting
    ? 'Desconectando…'
    : isConnected
      ? `Conectado a ${connectedEndpoint} — clic para desconectar`
      : status === 'error'
        ? 'Conexión perdida — clic para volver al login'
        : 'Sin conexión — clic para ir al login';

  return {
    isConnected,
    status,
    isDisconnecting,
    tooltipTitle,
    onClick,
  };
}
