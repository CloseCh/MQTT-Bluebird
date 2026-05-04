export interface BrokerLoad {
  '1min': number;
  '5min': number;
  '15min': number;
}

export interface BrokerStats {
  version: string;
  uptime: string;
  clients: {
    total: number;
    connected: number;
    disconnected: number;
    inactive: number;
    active: number;
    expired: number;
    maximum: number;
  };
  messages: {
    stored: number;
    received: number;
    sent: number;
  };
  store: {
    messages: { count: number; bytes: number };
  };
  subscriptions: { count: number };
  sharedSubscriptions: { count: number };
  retainedMessages: { count: number };
  heap: { current: number; maximum: number };
  bytes: { received: number; sent: number };
  publish: {
    bytes: { received: number; sent: number };
    messages: { dropped: number; received: number; sent: number };
  };
  packet: { out: { count: number; bytes: number } };
  connections: { socket: { count: number } };
  load: {
    messages: { received: BrokerLoad; sent: BrokerLoad };
    publish: { dropped: BrokerLoad; received: BrokerLoad; sent: BrokerLoad };
    bytes: { received: BrokerLoad; sent: BrokerLoad };
    sockets: BrokerLoad;
    connections: BrokerLoad;
  };
}

export interface TimeSeriesPoint {
  timestamp: number;
  time: string;
  msgReceived: number;
  msgSent: number;
  bytesReceived: number;
  bytesSent: number;
}

export interface BrockerMonitorContextValue {
  stats: BrokerStats;
  timeSeries: TimeSeriesPoint[];
}
