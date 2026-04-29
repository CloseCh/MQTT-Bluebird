import { createContext, useContext, type ReactNode } from 'react';
import { subscriptionService } from '../service';
import type { SubscriptionContextValue } from '../types';

const subscriptionContext = createContext<SubscriptionContextValue | null>(null);

interface SubscriptionProviderProp {
  children: ReactNode;
}

export function SubscriptionProvider({ children }: SubscriptionProviderProp) {

  const subscription = subscriptionService();

  return (
    <subscriptionContext.Provider value={subscription}>
      {children}
    </subscriptionContext.Provider>
  );
}

export function useSubscriptionContext(): SubscriptionContextValue {
  const ctx = useContext(subscriptionContext);
  if (!ctx) {
    throw new Error('useMQTTContext debe usarse dentro de <subscriptionProvider>');
  }
  return ctx;
}