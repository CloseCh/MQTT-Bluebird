import { useState, useCallback, useEffect, useRef } from 'react';
import { useTransportContext } from '@/transport';
import type { ConnectionContextValue, ConnectionStatus } from '../types/connection.types';

export function useConnectionService(): ConnectionContextValue {
  const transport = useTransportContext();
  const [status, setStatus] = useState<ConnectionStatus>('disconnected');
  const [connectedEndpoint, setConnectedEndpoint] = useState<string | null>(null);
  // Marca una desconexión iniciada por el usuario para no pintarla como caída.
  const manualDisconnectRef = useRef(false);

  const isConnected = status === 'connected';

  const handleConnection = useCallback(async (endpoint: string, username?: string, password?: string): Promise<boolean> => {
    const optinos: MqttConnectionOptions = { endpoint, username, password };
    const result = await transport.mqttConnection(optinos);
    manualDisconnectRef.current = false;
    setStatus(result ? 'connected' : 'disconnected');
    setConnectedEndpoint(result ? endpoint : null);
    return result;
  }, [transport]);

  const handleDisconnection = useCallback(async (): Promise<void> => {
    manualDisconnectRef.current = true;
    await transport.mqttDisconnect();
    setStatus('disconnected');
    setConnectedEndpoint(null);
  }, [transport]);

  // El broker notifica el cierre tanto en desconexión manual como en caída.
  // Si no fue manual, es una pérdida inesperada → estado 'error' (rojo).
  useEffect(
    () => transport.onBrokerDisconnected(() => {
      if (manualDisconnectRef.current) {
        manualDisconnectRef.current = false;
        return;
      }
      setStatus('error');
      setConnectedEndpoint(null);
    }),
    [transport],
  );

  return {
    isConnected,
    status,
    connectedEndpoint,
    handleConnection,
    handleDisconnection,
  };
}
