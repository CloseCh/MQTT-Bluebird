import type { TreeRoot } from "../types/tree.type";

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

/** ¿El topic concreto encaja en el patrón de suscripción (con + y #)? */
export function topicMatchesSubscription(topic: string, subscription: string): boolean {
  return matchSegments(topic.split("/"), subscription.split("/"));
}

export function getAllMatchingSubscriptions(root: TreeRoot, topic: string): string[] {
  const segments = topic.split("/");

  return [...root.children.values()]
    .filter(node => matchSegments(segments, node.suscription.split("/")))
    .map(node => node.suscription);
}