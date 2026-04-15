import { createContext, useContext, type ReactNode } from 'react';
import MQTTService, { type MQTTContextValue } from '../service/MQTTService.js';

const MQTTContext = createContext<MQTTContextValue | null>(null);

interface MQTTProviderProps {
  dataPointCount: number;
  children: ReactNode;
}

export function MQTTProvider({ dataPointCount, children }: MQTTProviderProps) {

  const mqtt = MQTTService(dataPointCount);

  return (
    <MQTTContext.Provider value={mqtt}>
      {children}
    </MQTTContext.Provider>
  );
}

export function useMQTTContext(): MQTTContextValue {
  const ctx = useContext(MQTTContext);
  if (!ctx) {
    throw new Error('useMQTTContext debe usarse dentro de <MQTTProvider>');
  }
  return ctx;
}