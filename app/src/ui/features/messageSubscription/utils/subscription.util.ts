import type { SubscriptionList } from '../types/subscription.types';
import type { TreeRoot } from '../../../shared/types/tree.type';

function mqttTopicToRegex(subscription: string): RegExp {
  const pattern = subscription
    .replace(/[.^${}()|[\]\\]/g, '\\$&')
    .replace(/\/#$/g, '(/.*)?')
    .replace(/^#$/g, '.*')
    .replace(/\+/g, '[^/]+');

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

export const getNotSubscribed = (list: SubscriptionList, topics: string[]) =>
  topics.filter((t) => !list[t]);

export const getSelectedTopics = (list: SubscriptionList) =>
  Object.keys(list).filter((k) => list[k]);

export function matchTopicToSubscription(
  root: TreeRoot,
  topic: string
): string | undefined {
  const segments = topic.split("/");

  for (const subscriptionNode of root.children.values()) {
    const subSegments = subscriptionNode.suscription.split("/");

    if (matchSegments(segments, subSegments)) {
      return subscriptionNode.suscription;
    }
  }

  return undefined;
}

function matchSegments(
  topicSegments: string[],
  subSegments: string[]
): boolean {
  const [currentSub, ...restSub] = subSegments;
  const [currentTopic, ...restTopic] = topicSegments;

  // # matchea todo lo que queda (incluso vacío)
  if (currentSub === "#") return true;

  // si se acaban los segmentos de ambos lados, es match
  if (!currentSub && !currentTopic) return true;

  // si uno se acaba y el otro no, no es match
  if (!currentSub || !currentTopic) return false;

  // + matchea cualquier segmento individual
  if (currentSub === "+" || currentSub === currentTopic) {
    return matchSegments(restTopic, restSub);
  }

  return false;
}

export function getAllMatchingSubscriptions(root: TreeRoot, topic: string): string[] {
  const segments = topic.split("/");

  return [...root.children.values()]
    .filter(node => matchSegments(segments, node.suscription.split("/")))
    .map(node => node.suscription);
}
