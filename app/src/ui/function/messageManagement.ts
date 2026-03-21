import { useEffect, useState, useCallback } from 'react';

type PacketFormatList = Record<string, MQTTMessageList>;
type TopicList = string[];

interface Return {
  topics: TopicList;
  getTypedMessageList: (topic: string) => MQTTMessageList;
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
  const [messageListByTopic, setMessageListByTopic] = useState<PacketFormatList>({});
  
  const emptyMessage = { messageList: [], format: 'ascii' };

  const onMessage = useCallback((message: MQTTMessage) => {
    const topic: string = message.topic;
    
    setTopics(prev =>
      prev.includes(topic) ? prev : [...prev, topic]
    );

    setMessageListByTopic(prev => {
      const current = prev[topic] ?? emptyMessage;
      const MessageList = current.messageList;

      const newMessageList = MessageList.length >= dataPointCount
        ? [message, ...MessageList.slice(0, -1)]
        : [message, ...MessageList];

      return {
        ...prev,
        [topic] : {
          ...current,
          messageList: newMessageList
        }
      }
    });
  }, [dataPointCount]);

  useEffect(() => {
    const unsub = window.electron.subscribeMQTT(onMessage);
    return unsub;
  }, [onMessage]);

  const setFormat = useCallback((topic: string, format: MessageTypes) => {
    console.log('setFormat called', topic, format);
    setMessageListByTopic(prev => ({
      ...prev,
      [topic]: { ...prev[topic], format }
    }));
  }, []);

  return {
    topics,
    getTypedMessageList: topic => messageListByTopic[topic] ?? emptyMessage,
    setFormat
  };
}