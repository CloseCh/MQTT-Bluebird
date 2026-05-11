/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react';
import { useBrockerMonitorService } from './useBrockerMonitorService';
import type { BrockerMonitorContextValue } from '../types/brockerMonitor.types';

const BrockerMonitorContext = createContext<BrockerMonitorContextValue | null>(null);

interface BrockerMonitorProviderProps {
  children: ReactNode;
}

export function BrockerMonitorProvider({ children }: BrockerMonitorProviderProps) {
  const value = useBrockerMonitorService();
  return (
    <BrockerMonitorContext.Provider value={value}>
      {children}
    </BrockerMonitorContext.Provider>
  );
}

export function useBrockerMonitorContext(): BrockerMonitorContextValue {
  const ctx = useContext(BrockerMonitorContext);
  if (!ctx) throw new Error('useBrockerMonitorContext must be used inside <BrockerMonitorProvider>');
  return ctx;
}
