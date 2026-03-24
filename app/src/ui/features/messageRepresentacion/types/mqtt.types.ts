export type Topic = string;

export type PacketFormatList = Record<Topic, MQTTMessageList>;

export type TopicList = Topic[];

export type MessageFormatEnum = 'ascii' | 'hex' | 'json' | 'utf8' | 'asciiCode' | 'int8'| 'uint8'| 'int16'| 'uint16'| 'int32'| 'uint32'| 'int64'| 'uint64';