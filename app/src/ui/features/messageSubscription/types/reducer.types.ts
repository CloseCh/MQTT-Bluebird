import type { Subscription } from './subscription.types';

export type SubscriptionAction =
  | { type: 'subscribed'; subscription: Subscription }
  | { type: 'unsubscribed'; topic: string }
  | { type: 'changed'; previousTopic: string; subscription: Subscription }
  | { type: 'toggled'; topic: string }
  | { type: 'reset' };
