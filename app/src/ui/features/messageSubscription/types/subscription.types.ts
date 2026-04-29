export type Subscription = string;
export type Selected = boolean;

export type SubscriptionList = Record<Subscription, Selected>;

export interface SubscriptionContextValue {
  subscriptionList: SubscriptionList;
  subscribe: (topics: string[]) => Promise<void>;
  updateSubscriptionState:  (topic: string) => void;
  unsubscribe: (topic: string) => Promise<void>;
  getSelectedSubscriptions: () => string[]
}