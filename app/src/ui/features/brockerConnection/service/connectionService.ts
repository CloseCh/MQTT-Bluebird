import { useState, useCallback } from 'react';
import type { ConnectionContextValue } from '../types/connection.types';

export function connectionService(): ConnectionContextValue {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedEndpoint, setConnectedEndpoint] = useState<string | null>(null);

  const handleConnection = useCallback(async (endpoint: string, username?: string, password?: string): Promise<boolean> => {
    const optinos: MqttConnectionOptions = { endpoint, username, password };
    const result = await window.electron.mqttConnection(optinos);
    setIsConnected(result);
    if (result) setConnectedEndpoint(endpoint);
    return result;
  }, []);

  const handleDisconnection = useCallback(async (): Promise<void> => {
    await window.electron.mqttDisconnect();
    setIsConnected(false);
    setConnectedEndpoint(null);
  }, []);

  return {
    isConnected,
    connectedEndpoint,
    handleConnection,
    handleDisconnection,
  };
}