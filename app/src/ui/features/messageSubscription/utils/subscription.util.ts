import type { SubscriptionList } from "../types/subscription.types";

function mqttTopicToRegex(subscription: string): RegExp {
  const pattern = subscription
    .replace(/[.^${}()|[\]\\]/g, "\\$&")
    .replace(/\/#$/g, "(/.*)?")
    .replace(/^#$/g, ".*")
    .replace(/\+/g, "[^/]+");

  return new RegExp(`^${pattern}$`);
}

export function findCoveringSubscriptions(
  newTopic: string,
  subscriptionList: SubscriptionList
): string[] {
  return Object.keys(subscriptionList).filter((existing) => {
    if (existing === newTopic) return true;
    return mqttTopicToRegex(existing).test(newTopic);
  });
}

export function hasCoveringSubscription(
  newTopic: string,
  subscriptionList: SubscriptionList
): boolean {
  return findCoveringSubscriptions(newTopic, subscriptionList).length > 0;
}