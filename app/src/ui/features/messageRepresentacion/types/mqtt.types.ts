export type Topic = string;

export interface MQTTMessageList {
  messageList: MQTTMessage[];
  format: MessageFormatEnum;
};

export type PacketFormatList = Record<Topic, MQTTMessageList>;

export type TopicList = Topic[];

export type MessageFormatEnum = 'ascii' | 'hex' | 'json' | 'asciiCode' | 'int8'| 'uint8'| 'int16'| 'uint16'| 'int32'| 'uint32'| 'int64'| 'uint64';