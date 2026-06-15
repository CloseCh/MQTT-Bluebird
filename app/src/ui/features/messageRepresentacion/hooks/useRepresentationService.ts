import { useEffect, useState, useCallback, useReducer } from 'react';
import { useTransportContext } from '@/transport';
import type {
  Topic, 
  MessageFormatEnum, 
  MQTTContextValue, 
  TableType
} from '../types/mqtt.types';
import { EMPTY_MESSAGE } from '../constants/TypeSelector.constants';
import {
  messagesReducer, initialMessagesState,
} from '../reducers/representation.reducer';

function useRepresentationService(dataPointCount: number): MQTTContextValue {
  const transport = useTransportContext();

  // estado de mensajes: cambia de varias formas -> reducer
  const [{ topicList, messageListByTopic }, dispatch] = useReducer(
    messagesReducer,
    initialMessagesState,
  );

  // selecciones de UI: cambio trivial -> useState
  const [messageSelected, setMessageSelected] = useState<MQTTMessage | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic>('');
  const [tableType, setTableType] = useState<TableType>('history');

  const onMessage = useCallback((message: MQTTMessage) => {
    dispatch({ type: 'messageReceived', message, cap: dataPointCount });
  }, [dataPointCount]);

  useEffect(() => transport.subscribeMQTT(onMessage), [transport, onMessage]);

  useEffect(
    () => transport.onBrokerDisconnected(() => {
      dispatch({ type: 'cleared' });
      setMessageSelected(null);
      setSelectedTopic('');
    }),
    [transport],
  );

  const setMessageFormat = useCallback((topic: Topic, format: MessageFormatEnum) => {
    dispatch({ type: 'formatChanged', topic, format });
  }, []);

  const removeTopics = useCallback((topics: Topic[]) => {
    if (topics.length === 0) return;
    dispatch({ type: 'removeTopics', topics });
    // Si el topic seleccionado fue eliminado, limpiamos la selección.
    if (topics.includes(selectedTopic)) {
      setSelectedTopic('');
      setMessageSelected(null);
    }
  }, [selectedTopic]);

  return {
    topicList,
    removeTopics,
    getSelectedTopic: () => selectedTopic,
    setSelectedTopic,
    getTypedMessageList: (topic) => messageListByTopic[topic] ?? EMPTY_MESSAGE,
    setMessageFormat,
    getMessageFormat: (topic) => messageListByTopic[topic]?.format ?? EMPTY_MESSAGE.format,
    getMessageSelected: () => messageSelected,
    setMessageSelected,
    tableType,
    setTableType,
  };
}

export default useRepresentationService;