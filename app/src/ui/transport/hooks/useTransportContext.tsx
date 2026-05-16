/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useMemo } from 'react';
import { createTransport } from '../service/createTransport';
import type { MQTTTransport } from '../types/transport.types';

const TransportContext = createContext<MQTTTransport | null>(null);

export function TransportProvider({ children }: { children: React.ReactNode }) {
  const transport = useMemo(() => createTransport(), []);
  return <TransportContext.Provider value={transport}>{children}</TransportContext.Provider>;
}

export function useTransportContext(): MQTTTransport {
  const ctx = useContext(TransportContext);
  if (!ctx) throw new Error('useTransportContext must be used inside <TransportProvider>');
  return ctx;
}
