import { useReducer, useCallback, useEffect, useRef, useMemo } from 'react';
import { useTransportContext } from '@/transport';
import type { Subscription, SubscriptionContextValue } from '../types/subscription.types';
import { subscriptionReducer } from '../reducers/subscription.reducer';
import { initialSubscriptionList } from '../constants/suscription.constants';
import { getSelectedTopics } from '../utils/subscription.util';

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

  const subscribe = useCallback(async (subscription: Subscription) => {
    // ya suscrito al mismo topic: evita un alta duplicada
    if (listRef.current[subscription.topic]) return;
    try {
      await transport.mqttSubscribe(subscription);
      dispatch({ type: 'subscribed', subscription });
    } catch (err) {
      console.error('Error al suscribirse:', err);
    }
  }, [transport]);

  const unsubscribe = useCallback(async (topic: string) => {
    try {
      await transport.mqttUnsubscribe(topic);
      dispatch({ type: 'unsubscribed', topic });
    } catch (err) {
      console.error('Error al desuscribirse:', err);
    }
  }, [transport]);

  // Cambiar el topic y/o las configuraciones (QoS) de una suscripción existente.
  // MQTT no tiene "rename": se desuscribe el topic anterior y se vuelve a suscribir.
  const changeSubscription = useCallback(
    async (previousTopic: string, subscription: Subscription) => {
      try {
        if (previousTopic !== subscription.topic) {
          await transport.mqttUnsubscribe(previousTopic);
        }
        await transport.mqttSubscribe(subscription);
        dispatch({ type: 'changed', previousTopic, subscription });
      } catch (err) {
        console.error('Error al cambiar la suscripción:', err);
      }
    },
    [transport],
  );

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
    subscribe,
    unsubscribe,
    changeSubscription,
    updateSubscriptionState,
    getSelectedSubscriptions: () => selectedSubscriptions,
  };
}

export default useSubscriptionService;
