import { SERIES_COLORS } from "@/theme";
import type { BrokerStats } from "../types/brockerMonitor.types";

export const CLIENT_COLORS: Record<string, string> = {
  Connected:    SERIES_COLORS.green,
  Disconnected: SERIES_COLORS.red,
  Inactive:     SERIES_COLORS.orange,
  Expired:      SERIES_COLORS.grey,
};

export const MAX_SERIES_POINTS = 60;

export const EMPTY_LOAD = { '1min': 0, '5min': 0, '15min': 0 };

export const INITIAL_STATS: BrokerStats = {
  version: '',
  uptime: '',
  clients: { total: 0, connected: 0, disconnected: 0, inactive: 0, active: 0, expired: 0, maximum: 0 },
  messages: { stored: 0, received: 0, sent: 0 },
  store: { messages: { count: 0, bytes: 0 } },
  subscriptions: { count: 0 },
  sharedSubscriptions: { count: 0 },
  retainedMessages: { count: 0 },
  heap: { current: 0, maximum: 0 },
  bytes: { received: 0, sent: 0 },
  publish: {
    bytes: { received: 0, sent: 0 },
    messages: { dropped: 0, received: 0, sent: 0 },
  },
  packet: { out: { count: 0, bytes: 0 } },
  connections: { socket: { count: 0 } },
  load: {
    messages: { received: { ...EMPTY_LOAD }, sent: { ...EMPTY_LOAD } },
    publish: { dropped: { ...EMPTY_LOAD }, received: { ...EMPTY_LOAD }, sent: { ...EMPTY_LOAD } },
    bytes: { received: { ...EMPTY_LOAD }, sent: { ...EMPTY_LOAD } },
    sockets: { ...EMPTY_LOAD },
    connections: { ...EMPTY_LOAD },
  },
};