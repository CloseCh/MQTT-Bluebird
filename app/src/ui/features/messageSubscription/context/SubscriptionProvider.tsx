/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, type ReactNode } from 'react';
import { useSubscriptionService } from '../hooks/useSubscriptionService';
import type { SubscriptionContextValue } from '../types/subscription.types';

const subscriptionContext = createContext<SubscriptionContextValue | null>(null);

interface SubscriptionProviderProp {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProp) {
  const subscription = useSubscriptionService();

  return (
    <subscriptionContext.Provider value={subscription}>
      {children}
    </subscriptionContext.Provider>
  );
}

export function useSubscriptionContext(): SubscriptionContextValue {
  const ctx = useContext(subscriptionContext);
  if (!ctx) {
    throw new Error('useSubscriptionContext debe usarse dentro de <SubscriptionProvider>');
  }
  return ctx;
}