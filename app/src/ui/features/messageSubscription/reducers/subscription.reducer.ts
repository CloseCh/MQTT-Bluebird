import type { SubscriptionAction } from '../types/reducer.types';
import type { SubscriptionList } from '../types/subscription.types';

export function subscriptionReducer(
  state: SubscriptionList,
  action: SubscriptionAction,
): SubscriptionList {
  switch (action.type) {
    case 'subscribed': {
      const next = { ...state };
      action.topics.forEach((t) => { next[t] = true; });
      return next;
    }
    case 'unsubscribed': {
      const next = { ...state };
      delete next[action.topic];
      return next;
    }
    case 'toggled':
      return { ...state, [action.topic]: !state[action.topic] };
    case 'reset':
      return {};
    default:
      return state;
  }
}