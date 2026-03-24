import { useEffect, useState, useCallback } from 'react';
import type { Topic, TopicList , PacketFormatList, MessageFormatEnum } from '../types/mqtt.types';

// Metodos del contexto, y los cuales usables por el custom hook
export interface MQTTContextValue {
  topicList: TopicList;
  getSelectedTopic: () => Topic;
  setSelectedTopic: (topic: Topic) => void;
  getTypedMessageList: (topic: Topic) => MQTTMessageList;
  setMessageFormat: (topic: Topic, format: MessageFormatEnum) => void;
  getMessageFormat: (topic: Topic) => MessageFormatEnum;
}
/**
 * Es un metodo que gestiona los mensajes que llega del main process en electrón,
 *    - Lista los topicos, mensajes
 *    - Con metodos que devuelve lo que necesita cada componente
 * 
 * Falta agregar localstorage para que se pueda mantener los mensajes.
 * 
 * @param dataPointCount Cantidad de mensajes en la lista
 * @returns lista de topics, metodos para obtener datos del mensaje
 */
function useMQTT(dataPointCount: number): MQTTContextValue {
  const [topicList, setTopicList] = useState<TopicList>([]);
  const [messageListByTopic, setMessageListByTopic] = useState<PacketFormatList>({});
  const [selectedTopic, setSelectedTopic] = useState<Topic>("");
  
  const emptyMessage: MQTTMessageList = { messageList: [], format: 'ascii' };

  const onMessage = useCallback((message: MQTTMessage) => {
    

    const topic: Topic = message.topic;
    
    setTopicList(prev => {
      if (prev.includes(topic)) {
        return prev;
      } else {
        const newTopicList = [...prev, topic];
        return newTopicList;
      }
    });

    setMessageListByTopic(prev => {
      const current = prev[message.topic] ?? emptyMessage;
      const MessageList = current.messageList;

      const newMessageList = MessageList.length >= dataPointCount
        ? [message, ...MessageList.slice(0, -1)]
        : [message, ...MessageList];

      return {
        ...prev,
        [message.topic] : {
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

  const handleFormat = useCallback((topic: Topic, format: MessageFormatEnum) => {
    console.log('setFormat called', topic, format);
    setMessageListByTopic(prev => ({
      ...prev,
      [topic]: { ...prev[topic], format }
    }));
  }, []);

  const handleSelectedTopic = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  return {
    topicList,
    getSelectedTopic: () => selectedTopic,
    setSelectedTopic: handleSelectedTopic,
    getTypedMessageList: topic => messageListByTopic[topic] ?? emptyMessage,
    setMessageFormat: handleFormat,
    getMessageFormat: topic => messageListByTopic[topic].format
  };
}

export default useMQTT;