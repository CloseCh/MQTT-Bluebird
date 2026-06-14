import type { Qos, SubscriptionList } from "../types/subscription.types";

export const DEFAULT_QOS: Qos = 0;

export const QOS_OPTIONS: Qos[] = [0, 1, 2];

export const initialSubscriptionList: SubscriptionList = {
  //'#': { topic: '#', qos: DEFAULT_QOS, selected: true },
};
