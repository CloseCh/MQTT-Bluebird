import { useState, useCallback, useEffect } from 'react';
import { useTransportContext } from '@/transport';
import type { SubscriptionContextValue, SubscriptionList } from '../types/subscription.types';
import { useConnectionContext } from '@/features/brockerConnection';

export function useSubscriptionService(): SubscriptionContextValue {
  const transport = useTransportContext();
  const { isConnected } = useConnectionContext();
  const [subscriptionList, setSubscriptionList] = useState<SubscriptionList>({['#']:true});

  const subscribe = useCallback(async (topics: string[]) => {
    try {
      const notSubscribed = topics.filter(
        (key) => !subscriptionList[key]
      );

      if (notSubscribed.length === 0) return;

      await transport.mqttSubscribe(notSubscribed);

      setSubscriptionList((prev) => {
        const newSubscriptionList = {...prev};
        notSubscribed.forEach(key => {
          newSubscriptionList[key] = true;
        });
        return newSubscriptionList;
      });
    } catch (err) {
      console.error('Error al suscribirse:', err);
    }
  }, [transport, subscriptionList]);

  const unsubscribe = useCallback(async (topic: string) => {
    try {
      await transport.mqttUnsubscribe([topic]);

      setSubscriptionList(prev => {
        const newSubscriptionList = {...prev};
        delete newSubscriptionList[topic];
        return newSubscriptionList;
      });
    } catch (err) {
      console.error('Error al desuscribirse:', err);
    }
  }, [transport]);

  function updateSubscriptionState (topic: string) {
    setSubscriptionList(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  useEffect(() => {
    if (!isConnected) return;
  }, [isConnected]);

  useEffect(() => {
    const unsub = transport.onBrokerDisconnected(() => {
      setSubscriptionList({});
    });
    return unsub;
  }, [transport]);

  return {
    subscriptionList,
    updateSubscriptionState,
    subscribe,
    unsubscribe,
    getSelectedSubscriptions: () => Object.keys(subscriptionList).filter(key => subscriptionList[key])
  };
}

export default useSubscriptionService;