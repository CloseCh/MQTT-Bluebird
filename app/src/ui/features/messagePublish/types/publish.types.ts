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
  message: PublishFormValues;
}

export interface PublishFormValues extends Omit<PublishPayload, 'message'> {
  message: string;
  dataType: MessageFormatEnum;
};