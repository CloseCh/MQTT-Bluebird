import { useState, useCallback } from 'react';
import { useTransportContext } from '@/transport';
import type { ConnectionContextValue } from '../types/connection.types';

export function useConnectionService(): ConnectionContextValue {
  const transport = useTransportContext();
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedEndpoint, setConnectedEndpoint] = useState<string | null>(null);
  
  const handleConnection = useCallback(async (endpoint: string, username?: string, password?: string): Promise<boolean> => {
    const optinos: MqttConnectionOptions = { endpoint, username, password };
    const result = await transport.mqttConnection(optinos);
    setIsConnected(result);
    if (result) setConnectedEndpoint(endpoint);
    return result;
  }, [transport]);

  const handleDisconnection = useCallback(async (): Promise<void> => {
    await transport.mqttDisconnect();
    setIsConnected(false);
    setConnectedEndpoint(null);
  }, [transport]);

  return {
    isConnected,
    connectedEndpoint,
    handleConnection,
    handleDisconnection,
  };
}