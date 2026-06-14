import type { SubscriptionAction } from '../types/reducer.types';
import type { SubscriptionList } from '../types/subscription.types';

export function subscriptionReducer(
  state: SubscriptionList,
  action: SubscriptionAction,
): SubscriptionList {
  switch (action.type) {
    case 'subscribed': {
      const { subscription } = action;
      return {
        ...state,
        [subscription.topic]: { ...subscription, selected: true },
      };
    }
    case 'unsubscribed': {
      const next = { ...state };
      delete next[action.topic];
      return next;
    }
    case 'changed': {
      const { previousTopic, subscription } = action;
      const wasSelected = state[previousTopic]?.selected ?? true;
      const next = { ...state };
      delete next[previousTopic];
      next[subscription.topic] = { ...subscription, selected: wasSelected };
      return next;
    }
    case 'toggled': {
      const current = state[action.topic];
      if (!current) return state;
      return {
        ...state,
        [action.topic]: { ...current, selected: !current.selected },
      };
    }
    case 'reset':
      return {};
    default:
      return state;
  }
}
