// reducers/representation.reducer.ts
import type { TopicList, PacketFormatList, Topic, MessageFormatEnum } from '../types/mqtt.types';
import { EMPTY_MESSAGE } from '../constants/TypeSelector.constants';
import { appendCapped } from '../utils/message.util';

export interface MessagesState {
  topicList: TopicList;
  messageListByTopic: PacketFormatList;
}

export type MessagesAction =
  | { type: 'messageReceived'; message: MQTTMessage; cap: number }
  | { type: 'formatChanged'; topic: Topic; format: MessageFormatEnum }
  | { type: 'cleared' };

export const initialMessagesState: MessagesState = {
  topicList: [],
  messageListByTopic: {},
};

export function messagesReducer(state: MessagesState, action: MessagesAction): MessagesState {
  switch (action.type) {
    case 'messageReceived': {
      const { message, cap } = action;
      const topic = message.topic;

      const topicList = state.topicList.includes(topic)
        ? state.topicList
        : [...state.topicList, topic];

      const current = state.messageListByTopic[topic] ?? EMPTY_MESSAGE;

      return {
        topicList,
        messageListByTopic: {
          ...state.messageListByTopic,
          [topic]: {
            ...current,
            messageList: appendCapped(current.messageList, message, cap),
          },
        },
      };
    }
    case 'formatChanged': {
      const current = state.messageListByTopic[action.topic] ?? EMPTY_MESSAGE;
      return {
        ...state,
        messageListByTopic: {
          ...state.messageListByTopic,
          [action.topic]: { ...current, format: action.format },
        },
      };
    }
    case 'cleared':
      return initialMessagesState;
    default:
      return state;
  }
}