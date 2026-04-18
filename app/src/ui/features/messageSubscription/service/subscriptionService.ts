import { useState, useCallback, useEffect } from "react";
import type { SubscriptionContextValue, SubscriptionList } from "../types/subscription.types";

const defaultSubscription: SubscriptionList = {"#": false};

export function subscriptionService(): SubscriptionContextValue {
  const [subscriptionList, setSubscriptionList] = useState<SubscriptionList>(defaultSubscription);

  const subscribe = useCallback(async (topics: string[]) => {
    try {
      const notSubscribed = topics.filter(
        (key) => !subscriptionList[key]
      );
      
      if (notSubscribed.length === 0) return;

      await window.electron.mqttSubscribe(notSubscribed);

      setSubscriptionList((prev) => {
        const newSubscriptionList = {...prev};
        notSubscribed.forEach(key => {
          newSubscriptionList[key] = false;
        });
        return newSubscriptionList;
      });
    } catch (err) {
      console.error('Error al suscribirse:', err);
    }
  }, []);

  const unsubscribe = useCallback(async (topic: string) => {
    try {
      await window.electron.mqttUnsubscribe([topic]);

      setSubscriptionList(prev => {
        const newSubscriptionList = {...prev};
        delete newSubscriptionList[topic];
        return newSubscriptionList;
      });
    } catch (err) {
      console.error('Error al desuscribirse:', err);
    }
  }, []);

  function updateSubscriptionState (topic: string) {
    setSubscriptionList(prev => ({
      ...prev,
      [topic]: !prev[topic]
    }));
  };

  useEffect(() => {
    subscribe(Object.keys(defaultSubscription));
  }, [subscribe]);

  return {
    subscriptionList,
    updateSubscriptionState,
    subscribe,
    unsubscribe,
  };
}

export default subscriptionService;