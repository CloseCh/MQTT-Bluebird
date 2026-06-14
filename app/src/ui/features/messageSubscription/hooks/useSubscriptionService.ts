import { useReducer, useCallback, useEffect, useRef, useMemo } from 'react';
import { useTransportContext } from '@/transport';
import type { SubscriptionContextValue } from '../types/subscription.types';
import {
  subscriptionReducer
} from '../reducers/subscription.reducer';
import { initialSubscriptionList } from '../constants/suscription.constants';
import { getNotSubscribed, getSelectedTopics } from '../utils/subscription.util';

export function useSubscriptionService(): SubscriptionContextValue {
  const transport = useTransportContext();
  const [subscriptionList, dispatch] = useReducer(
    subscriptionReducer,
    initialSubscriptionList,
  );

  // ref para leer el estado más reciente dentro de callbacks async
  // sin recrearlos en cada cambio de la lista
  const listRef = useRef(subscriptionList);
  useEffect(() => { listRef.current = subscriptionList; }, [subscriptionList]);

  const subscribe = useCallback(async (topics: string[]) => {
    const notSubscribed = getNotSubscribed(listRef.current, topics);
    if (notSubscribed.length === 0) return;
    try {
      await transport.mqttSubscribe(notSubscribed);
      dispatch({ type: 'subscribed', topics: notSubscribed });
    } catch (err) {
      console.error('Error al suscribirse:', err);
    }
  }, [transport]);

  const unsubscribe = useCallback(async (topic: string) => {
    try {
      await transport.mqttUnsubscribe([topic]);
      dispatch({ type: 'unsubscribed', topic });
    } catch (err) {
      console.error('Error al desuscribirse:', err);
    }
  }, [transport]);

  const updateSubscriptionState = useCallback((topic: string) => {
    dispatch({ type: 'toggled', topic });
  }, []);

  useEffect(
    () => transport.onBrokerDisconnected(() => dispatch({ type: 'reset' })),
    [transport],
  );

  const selectedSubscriptions = useMemo(
    () => getSelectedTopics(subscriptionList),
    [subscriptionList],
  );

  return {
    subscriptionList,
    updateSubscriptionState,
    subscribe,
    unsubscribe,
    getSelectedSubscriptions: () => selectedSubscriptions,
  };
}

export default useSubscriptionService;