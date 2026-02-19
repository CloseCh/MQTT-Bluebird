import { useEffect, useState, useCallback } from 'react';

export function useMQTT(dataPointCount: number) {
  const [topics, setTopics] = useState<string[]>([]);
  const [messagesByTopic, setMessagesByTopic] = useState<Record<string, MQTTmessage[]>>({});

  const onMessage = useCallback((message: MQTTmessage) => {
    setTopics(prev =>
      prev.includes(message.topic) ? prev : [...prev, message.topic]
    );

    setMessagesByTopic(prev => {
      const topicMessages = prev[message.topic] ?? [];
      const newMessages = [...topicMessages, message];
      if (newMessages.length > dataPointCount) newMessages.shift();
      return { ...prev, [message.topic]: newMessages };
    });
  }, [dataPointCount]);

  useEffect(() => {
    const unsub = window.electron.subscribeMQTT(onMessage);
    return unsub;
  }, [onMessage]);

  return { topics, messagesByTopic };
}