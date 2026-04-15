import { useState, useCallback, useEffect } from "react";
import type { SubscriptionContextValue, SubscriptionList } from "../types/subscription.types";

export function subscriptionService(): SubscriptionContextValue {
  const defaultSubscription = ["#"];
  const [subscriptionList, setSubscriptionList] = useState<SubscriptionList>(defaultSubscription);

  useEffect(() => {
    subscribe(defaultSubscription)
  }, []);

  const subscribe = useCallback(async (topics: string[]) => {
    try {
      const updated = await window.electron.mqttSubscribe(topics);
      setSubscriptionList(updated);
    } catch (err) {
      console.error('Error al suscribirse:', err);
    }
  }, []);

  const unsubscribe = useCallback(async (topics: string[]) => {
    try {
      const updated = await window.electron.mqttUnsubscribe(topics);
      setSubscriptionList(updated);
    } catch (err) {
      console.error('Error al desuscribirse:', err);
    }
  }, []);

  const getSubscriptions = useCallback(async () => {
    try {
      const current = await window.electron.mqttGetSubscriptions();
      setSubscriptionList(current);
    } catch (err) {
      console.error('Error al obtener suscripciones:', err);
    }
  }, []);

  return {
    subscriptionList,
    subscribe,
    unsubscribe,
    getSubscriptions,
  };
}

export default subscriptionService;