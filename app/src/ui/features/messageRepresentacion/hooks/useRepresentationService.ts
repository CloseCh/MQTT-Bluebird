import { useEffect, useState, useCallback } from 'react';
import type { Topic, TopicList , PacketFormatList, MessageFormatEnum, MQTTMessageList, MQTTContextValue } from '../types/mqtt.types';

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
function useRepresentationService(dataPointCount: number): MQTTContextValue {
  const [topicList, setTopicList] = useState<TopicList>([]);
  const [messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);
  const [messageListByTopic, setMessageListByTopic] = useState<PacketFormatList>({});
  const [selectedTopic, setSelectedTopic] = useState<Topic>('');

  const emptyMessage: MQTTMessageList = { messageList: [], format: 'UTF-8' };

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

  const clearMessages = useCallback(() => {
    setTopicList([]);
    setMessageSelected(null);
    setMessageListByTopic({});
    setSelectedTopic('');
  }, []);


  useEffect(() => {
    const unsub = window.electron.subscribeMQTT(onMessage);
    return unsub;
  }, [onMessage]);

  useEffect(() => {
    const unsub = window.electron.onBrokerDisconnected(clearMessages);
    return unsub;
  }, [clearMessages]);

  const handleMessageFormat = useCallback((topic: Topic, format: MessageFormatEnum) => {
    
    setMessageListByTopic(prev => {
      const current = prev[topic] ?? emptyMessage;

      return {
        ...prev,
        [topic]: { ...current, format}
      }
    });

  }, []);

  const handleSelectedTopic = (topic: Topic) => {
    setSelectedTopic(topic);
  };

  return {
    topicList,
    getSelectedTopic: () => selectedTopic,
    setSelectedTopic: handleSelectedTopic,
    getTypedMessageList: topic => messageListByTopic[topic] ?? emptyMessage,
    setMessageFormat: handleMessageFormat,
    getMessageFormat: topic => messageListByTopic[topic]?.format ?? emptyMessage.format,
    getMessageSelected: () => messageSelected,
    setMessageSelected: message => setMessageSelected(message)
  };
}

export default useRepresentationService;