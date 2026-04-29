export interface MQTTContextValue {
  topicList: TopicList;
  getSelectedTopic: () => Topic;
  setSelectedTopic: (topic: Topic) => void;
  getTypedMessageList: (topic: Topic) => MQTTMessageList;
  setMessageFormat: (topic: Topic, format: MessageFormatEnum) => void;
  getMessageFormat: (topic: Topic) => MessageFormatEnum;
}

export type Topic = string;

export interface MQTTMessageList {
  messageList: MQTTMessage[];
  format: MessageFormatEnum;
};

export type PacketFormatList = Record<Topic, MQTTMessageList>;

export type TopicList = Topic[];

export type MessageFormatEnum = 'UTF-8' | 'HEX' | 'ASCIICode' | 'int8'| 'uint8'| 'int16'| 'uint16'| 'int32'| 'uint32'| 'int64'| 'uint64';