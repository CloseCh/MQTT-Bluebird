export type UnsubscribeFn = () => void;

export type Listener<T> = (payload: T) => void;

export interface MQTTTransport {
  mqttConnection(options: MqttConnectionOptions): Promise<boolean>;
  mqttDisconnect(): Promise<void>;
  publishMQTT(payload: PublishPayload): Promise<void>;
  mqttSubscribe(subscription: MqttSubscription): Promise<MqttSubscription[]>;
  mqttUnsubscribe(topic: string): Promise<MqttSubscription[]>;
  mqttGetSubscriptions(): Promise<MqttSubscription[]>;

  subscribeMQTT(callback: (msg: MQTTMessage) => void): UnsubscribeFn;
  systemMessage(callback: (msg: MQTTMessage) => void): UnsubscribeFn;
  onSubscriptionsUpdated(callback: (subscriptions: MqttSubscription[]) => void): UnsubscribeFn;
  onBrokerDisconnected(callback: () => void): UnsubscribeFn;
}
