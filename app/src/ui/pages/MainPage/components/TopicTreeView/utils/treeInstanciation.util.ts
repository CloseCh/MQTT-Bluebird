import type { SubscriptionList } from "@/features/messageSubscription/types/subscription.types";
import type { TopicList } from "@/features/messageRepresentacion/types/mqtt.types";
import type { SuscriptionNode, TopicNode, TreeRoot } from "../types/tree.type";
import { getAllMatchingSubscriptions } from "./treeSearch.util";

export function initTree(): TreeRoot {
  const root: TreeRoot = {
    children: new Map<string, SuscriptionNode>(),
  };

  return root;
}

export function addSuscription(root: TreeRoot, newSuscription: string): void {
  const suscriptionNode: SuscriptionNode = {
    suscription: newSuscription,
    children: new Map<string, TopicNode>(),
  }

  root.children.set(newSuscription, suscriptionNode);
}

export function insertTopic(root: TreeRoot, subscription: string, topic: string): void {
  // 1. Obtener o crear el nodo de suscripción
  if (!root.children.has(subscription)) {
    root.children.set(subscription, {
      suscription: subscription,
      children: new Map(),
    });
  }

  const subscriptionNode = root.children.get(subscription)!;

  // 2. Insertar los segmentos del topic en el árbol
  const segments = topic.split("/");
  let current = subscriptionNode.children!;

  segments.forEach((segment, index) => {
    if (!current.has(segment)) {
      const isLast = index === segments.length - 1;
      const fullPath = segments.slice(0, index + 1).join("/");

      current.set(segment, {
        label: segment,
        fullPath: isLast ? fullPath : undefined,
        children: new Map(),
      });
    }

    current = current.get(segment)!.children!;
  });
}

/**
 * Construye el árbol completo: cada suscripción es una rama raíz separada y,
 * debajo de ella, se insertan jerárquicamente los topics recibidos que la matchean.
 */
export function buildTree(
  subscriptionList: SubscriptionList,
  topicList: TopicList
): TreeRoot {
  const root = initTree();

  Object.keys(subscriptionList).forEach((subscription) => {
    addSuscription(root, subscription);
  });

  topicList.forEach((topic) => {
    getAllMatchingSubscriptions(root, topic).forEach((subscription) => {
      insertTopic(root, subscription, topic);
    });
  });

  return root;
}