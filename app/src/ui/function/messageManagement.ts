import { useEffect, useState, useCallback } from 'react';
import { type MessageTypes } from '../constants/types.js';

type PacketFormatList = Record<string, { messages: MQTTMessage[], format: MessageTypes }>;
type TopicList = string[];

interface Return {
  topics: TopicList;
  getMessageList: (topic: string) => MQTTMessage[];
  getFormat: (topic: string) => MessageTypes;
  setFormat: (topic: string, format: MessageTypes) => void
}

/**
 * Es un metodo que devuelve lo que se debe mostrar en el page, lista de topics y los mensajes.
 * 
 * @param dataPointCount Cantidad de mensajes en la lista
 * @returns lista de topics, metodos para obtener datos del mensaje
 */
export function useMQTT(dataPointCount: number): Return {
  const [topics, setTopics] = useState<TopicList>([]);
  const [packetByTopic, setPacketByTopic] = useState<PacketFormatList>({});

  const onMessage = useCallback((message: MQTTMessage) => {
    setTopics(prev =>
      prev.includes(message.topic) ? prev : [...prev, message.topic]
    );

    setPacketByTopic(prev => {
      const current = prev[message.topic] ?? { messages: [], format: 'string' };
      const newMessages = [...current.messages, message];
      if (newMessages.length > dataPointCount) newMessages.shift();
      return { ...prev, [message.topic]: { ...current, messages: newMessages } };
    });
  }, [dataPointCount]);

  useEffect(() => {
    const unsub = window.electron.subscribeMQTT(onMessage);
    return unsub;
  }, [onMessage]);

  const setFormat = useCallback((topic: string, format: MessageTypes) => {
    console.log('setFormat called', topic, format);
    setPacketByTopic(prev => ({
      ...prev,
      [topic]: { ...prev[topic], format }
    }));
  }, []);

  return {
    topics,
    getMessageList: topic => packetByTopic[topic]?.messages ?? [],
    getFormat: topic => packetByTopic[topic]?.format ?? 'string',
    setFormat
  };
}