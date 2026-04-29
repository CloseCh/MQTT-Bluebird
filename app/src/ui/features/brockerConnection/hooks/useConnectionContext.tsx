import { createContext, useContext, type ReactNode } from 'react';
import { connectionService } from '../service/connectionService';
import type { ConnectionContextValue } from '../types/connection.types';

const ConnectionContext = createContext<ConnectionContextValue | null>(null);

interface ConnectionProvider {
  children: ReactNode;
}

export function ConnectionProvider({ children }: ConnectionProvider) {

  const mqtt = connectionService();

  return (
    <ConnectionContext.Provider value={mqtt}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnectionContext(): ConnectionContextValue {
  const ctx = useContext(ConnectionContext);
  if (!ctx) {
    throw new Error('useConnectionContext debe usarse dentro de <MQTTProvider>');
  }
  return ctx;
}