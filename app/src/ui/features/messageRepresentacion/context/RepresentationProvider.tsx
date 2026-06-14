/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react';
import MQTTService from '../hooks/useRepresentationService';
import type { MQTTContextValue } from '../types/mqtt.types';

const MQTTContext = createContext<MQTTContextValue | null>(null);

interface RepresentationProviderProps {
  dataPointCount: number;
  children: ReactNode;
}

export function RepresentationProvider({ dataPointCount, children }: RepresentationProviderProps) {
  const mqtt = MQTTService(dataPointCount);

  return (
    <MQTTContext.Provider value={mqtt}>
      {children}
    </MQTTContext.Provider>
  );
}

export function useRepresentationContext(): MQTTContextValue {
  const ctx = useContext(MQTTContext);
  if (!ctx) {
    throw new Error('useRepresentationContext debe usarse dentro de <RepresentationProvider>');
  }
  return ctx;
}