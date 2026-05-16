export type UnsubscribeFn = () => void;

export interface MQTTTransport {
  mqttConnection(options: MqttConnectionOptions): Promise<boolean>;
  mqttDisconnect(): Promise<void>;
  publishMQTT(payload: PublishPayload): Promise<void>;
  mqttSubscribe(topics: string[]): Promise<string[]>;
  mqttUnsubscribe(topics: string[]): Promise<string[]>;
  mqttGetSubscriptions(): Promise<string[]>;

  subscribeMQTT(callback: (msg: MQTTMessage) => void): UnsubscribeFn;
  systemMessage(callback: (msg: MQTTMessage) => void): UnsubscribeFn;
  onSubscriptionsUpdated(callback: (topics: string[]) => void): UnsubscribeFn;
  onBrokerDisconnected(callback: () => void): UnsubscribeFn;
}
