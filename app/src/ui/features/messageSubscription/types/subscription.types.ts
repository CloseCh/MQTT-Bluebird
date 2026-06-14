export type Qos = 0 | 1 | 2;

export interface Subscription {
  topic: string;
  qos: Qos;
}

export interface SubscriptionEntry extends Subscription {
  selected: boolean;
}

export type SubscriptionList = Record<string, SubscriptionEntry>;

export interface SubscriptionContextValue {
  subscriptionList: SubscriptionList;
  subscribe: (subscription: Subscription) => Promise<void>;
  unsubscribe: (topic: string) => Promise<void>;
  changeSubscription: (previousTopic: string, subscription: Subscription) => Promise<void>;
  updateSubscriptionState: (topic: string) => void;
  getSelectedSubscriptions: () => string[];
}
