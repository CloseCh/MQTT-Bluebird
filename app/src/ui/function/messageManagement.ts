import { useEffect, useState, useCallback } from 'react';

type PacketList = Record<string, MQTTMessage[]>;
type TopicList = string[];

/**
 * Es un metodo que devuelve lo que se debe mostrar en el page, lista de topics y los mensajes.
 * 
 * @param dataPointCount Cantidad de mensajes en la lista
 * @returns lista de topics, y obteción de packet por topics
 */
export function useMQTT(dataPointCount: number) {
  const [topics, setTopics] = useState<TopicList>([]);
  const [packetByTopic, setPacketByTopic] = useState<PacketList>({});

  const onMessage = useCallback((message: MQTTMessage) => {
    setTopics(prev =>
      prev.includes(message.topic) ? prev : [...prev, message.topic]
    );

    setPacketByTopic(prev => {
      const topicPacket = prev[message.topic] ?? [];
      const newPacket = [...topicPacket, message];
      if (newPacket.length > dataPointCount) newPacket.shift();
      return { ...prev, [message.topic]: newPacket };
    });
  }, [dataPointCount]);

  useEffect(() => {
    const unsub = window.electron.subscribeMQTT(onMessage);
    return unsub;
  }, [onMessage]);

  return { 
    topics, 
    getMessage: (topic: string) => packetByTopic[topic] ?? [] 
  };
}