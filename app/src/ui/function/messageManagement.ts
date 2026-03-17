import { useEffect, useState, useCallback } from 'react';

type PacketFormatList = Record<string, { messages: MQTTMessage[], format: string }>;
type TopicList = string[];

/**
 * Es un metodo que devuelve lo que se debe mostrar en el page, lista de topics y los mensajes.
 * 
 * @param dataPointCount Cantidad de mensajes en la lista
 * @returns lista de topics, y obteción de packet por topics
 */
export function useMQTT(dataPointCount: number) {
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

    return {
        topics,
        getMessage: (topic: string) => packetByTopic[topic]?.messages ?? [],
        getFormat: (topic: string) => packetByTopic[topic]?.format ?? 'string',
        setFormat: (topic: string, format: string) => {
            setPacketByTopic(prev => ({
                ...prev,
                [topic]: { ...prev[topic], format }
            }));
        }
    };
}