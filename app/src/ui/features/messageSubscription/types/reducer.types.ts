export type SubscriptionAction =
  | { type: 'subscribed'; topics: string[] }
  | { type: 'unsubscribed'; topic: string }
  | { type: 'toggled'; topic: string }
  | { type: 'reset' };