export type SubscriptionList = string[];

export interface SubscriptionContextValue {
  subscriptionList: SubscriptionList;
  subscribe: (topics: string[]) => Promise<void>;
  unsubscribe: (topics: string[]) => Promise<void>;
  getSubscriptions: () => Promise<void>;
}