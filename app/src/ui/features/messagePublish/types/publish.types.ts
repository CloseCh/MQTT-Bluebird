export interface PublishContextValue {
  publishList: PublishList;
  createPublishMessage: (publishConfig: PublishConfig) => void;
  deletePublishMessage: (id: PublishConfigId) => void;
}

export type PublishConfigId = number;

export type PublishList = Record<PublishConfigId, PublishConfig>;

export interface PublishConfig {
  messageFormat: MessageFormatEnum;
  lastSend: string;
  message: PublishMessage;
}

export interface PublishMessage {
  topic: string;
  message: string;
  qos: number;
  retain: boolean;
}