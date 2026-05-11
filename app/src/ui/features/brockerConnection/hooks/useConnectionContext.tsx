/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react';
import { useConnectionService } from './useConnectionService';
import type { ConnectionContextValue } from '../types/connection.types';

const ConnectionContext = createContext<ConnectionContextValue | null>(null);

interface ConnectionProvider {
  children: ReactNode;
}

export function ConnectionProvider({ children }: ConnectionProvider) {

  const connection = useConnectionService();

  return (
    <ConnectionContext.Provider value={connection}>
      {children}
    </ConnectionContext.Provider>
  );
}

export function useConnectionContext(): ConnectionContextValue {
  const ctx = useContext(ConnectionContext);
  if (!ctx) {
    throw new Error('useConnectionContext debe usarse dentro de <ConnectionProvider>');
  }
  return ctx;
}