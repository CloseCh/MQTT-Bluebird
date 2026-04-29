import { useState, useCallback, useEffect } from "react";
import type { SubscriptionContextValue, SubscriptionList } from "../types/subscription.types";
import { useConnectionContext } from "@/features/brockerConnection/hooks"; 

const defaultSubscription: SubscriptionList = {"#": true};

export function subscriptionService(): SubscriptionContextValue {
  const { isConnected } = useConnectionContext();
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
          newSubscriptionList[key] = true;
        });
        return newSubscriptionList;
      });
    } catch (err) {
      console.error('Error al suscribirse:', err);
    }
  }, [subscriptionList]);

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
    if (!isConnected) return;
    subscribe(Object.keys(defaultSubscription));
  }, [isConnected]);

  return {
    subscriptionList,
    updateSubscriptionState,
    subscribe,
    unsubscribe,
    getSelectedSubscriptions: () => Object.keys(subscriptionList).filter(key => subscriptionList[key])
  };
}

export default subscriptionService;