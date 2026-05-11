import { useRef, useState } from 'react';
import { findCoveringSubscriptions } from '../../utils/subscription.util';
import { useSubscriptionContext } from '../../hooks/useSubscriptionContext';

export function useSubscriptionField() {
  const { subscribe, subscriptionList } = useSubscriptionContext();
  const inputRef = useRef<HTMLInputElement>(null);
  const [pendingTopic, setPendingTopic] = useState<string | null>(null);
  const [coveringTopics, setCoveringTopics] = useState<string[]>([]);

  function trySubscribe(topic: string) {
    const covering = findCoveringSubscriptions(topic, subscriptionList);
    if (covering.length > 0) {
      setPendingTopic(topic);
      setCoveringTopics(covering);
    } else {
      void subscribe([topic]);
    }
  }

  function handleClick() {
    if (!inputRef.current) return;
    const value = inputRef.current.value;
    if (value.length > 0) {
      trySubscribe(value);
      inputRef.current.value = '';
    }
  }

  function handleConfirm() {
    if (pendingTopic) void subscribe([pendingTopic]);
    setPendingTopic(null);
    setCoveringTopics([]);
  }

  function handleCancel() {
    setPendingTopic(null);
    setCoveringTopics([]);
  }

  return {
    inputRef,
    handleClick,
    pendingTopic,
    coveringTopics,
    handleConfirm,
    handleCancel
  }
}