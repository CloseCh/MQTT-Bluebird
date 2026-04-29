import { useState, useCallback } from "react";
import type { ConnectionContextValue } from "../types/connection.types";

export function connectionService(): ConnectionContextValue {
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [connectedEndpoint, setConnectedEndpoint] = useState<string | null>(null);

  const handleConnection = useCallback(async (endpoint: string): Promise<boolean> => {
    const result = await window.electron.mqttConnection(endpoint);
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