import { useEffect, useCallback, useState, useRef } from 'react';
import type { BrockerMonitorContextValue, BrokerStats, TimeSeriesPoint } from '../types/brockerMonitor.types';
import { MAX_SERIES_POINTS } from '../constants/brockerMonitor.constants';


function hexToString(hex: string): string {
  const bytes = new Uint8Array(
    (hex.match(/.{1,2}/g) ?? []).map(b => parseInt(b, 16))
  );
  return new TextDecoder().decode(bytes);
}

function formatTime(ts: number): string {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
}

const emptyLoad = { '1min': 0, '5min': 0, '15min': 0 };

const initialStats: BrokerStats = {
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
    messages: { received: { ...emptyLoad }, sent: { ...emptyLoad } },
    publish: { dropped: { ...emptyLoad }, received: { ...emptyLoad }, sent: { ...emptyLoad } },
    bytes: { received: { ...emptyLoad }, sent: { ...emptyLoad } },
    sockets: { ...emptyLoad },
    connections: { ...emptyLoad },
  },
};

function applyTopicToStats(stats: BrokerStats, topic: string, value: string): BrokerStats {
  const path = topic.replace('$SYS/broker/', '');
  const num = parseFloat(value) || 0;

  switch (path) {
    case 'version': return { ...stats, version: value };
    case 'uptime':  return { ...stats, uptime: value };

    case 'clients/total':        return { ...stats, clients: { ...stats.clients, total: num } };
    case 'clients/connected':    return { ...stats, clients: { ...stats.clients, connected: num } };
    case 'clients/disconnected': return { ...stats, clients: { ...stats.clients, disconnected: num } };
    case 'clients/inactive':     return { ...stats, clients: { ...stats.clients, inactive: num } };
    case 'clients/active':       return { ...stats, clients: { ...stats.clients, active: num } };
    case 'clients/expired':      return { ...stats, clients: { ...stats.clients, expired: num } };
    case 'clients/maximum':      return { ...stats, clients: { ...stats.clients, maximum: num } };

    case 'messages/stored':   return { ...stats, messages: { ...stats.messages, stored: num } };
    case 'messages/received': return { ...stats, messages: { ...stats.messages, received: num } };
    case 'messages/sent':     return { ...stats, messages: { ...stats.messages, sent: num } };

    case 'store/messages/count': return { ...stats, store: { messages: { ...stats.store.messages, count: num } } };
    case 'store/messages/bytes': return { ...stats, store: { messages: { ...stats.store.messages, bytes: num } } };

    case 'subscriptions/count':        return { ...stats, subscriptions: { count: num } };
    case 'shared_subscriptions/count': return { ...stats, sharedSubscriptions: { count: num } };
    case 'retained messages/count':    return { ...stats, retainedMessages: { count: num } };

    case 'heap/current': return { ...stats, heap: { ...stats.heap, current: num } };
    case 'heap/maximum': return { ...stats, heap: { ...stats.heap, maximum: num } };

    case 'bytes/received': return { ...stats, bytes: { ...stats.bytes, received: num } };
    case 'bytes/sent':     return { ...stats, bytes: { ...stats.bytes, sent: num } };

    case 'publish/bytes/received':    return { ...stats, publish: { ...stats.publish, bytes: { ...stats.publish.bytes, received: num } } };
    case 'publish/bytes/sent':        return { ...stats, publish: { ...stats.publish, bytes: { ...stats.publish.bytes, sent: num } } };
    case 'publish/messages/dropped':  return { ...stats, publish: { ...stats.publish, messages: { ...stats.publish.messages, dropped: num } } };
    case 'publish/messages/received': return { ...stats, publish: { ...stats.publish, messages: { ...stats.publish.messages, received: num } } };
    case 'publish/messages/sent':     return { ...stats, publish: { ...stats.publish, messages: { ...stats.publish.messages, sent: num } } };

    case 'packet/out/count': return { ...stats, packet: { out: { ...stats.packet.out, count: num } } };
    case 'packet/out/bytes': return { ...stats, packet: { out: { ...stats.packet.out, bytes: num } } };

    case 'connections/socket/count': return { ...stats, connections: { socket: { count: num } } };

    case 'load/messages/received/1min':  return { ...stats, load: { ...stats.load, messages: { ...stats.load.messages, received: { ...stats.load.messages.received, '1min': num } } } };
    case 'load/messages/received/5min':  return { ...stats, load: { ...stats.load, messages: { ...stats.load.messages, received: { ...stats.load.messages.received, '5min': num } } } };
    case 'load/messages/received/15min': return { ...stats, load: { ...stats.load, messages: { ...stats.load.messages, received: { ...stats.load.messages.received, '15min': num } } } };

    case 'load/messages/sent/1min':  return { ...stats, load: { ...stats.load, messages: { ...stats.load.messages, sent: { ...stats.load.messages.sent, '1min': num } } } };
    case 'load/messages/sent/5min':  return { ...stats, load: { ...stats.load, messages: { ...stats.load.messages, sent: { ...stats.load.messages.sent, '5min': num } } } };
    case 'load/messages/sent/15min': return { ...stats, load: { ...stats.load, messages: { ...stats.load.messages, sent: { ...stats.load.messages.sent, '15min': num } } } };

    case 'load/publish/dropped/1min':  return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, dropped: { ...stats.load.publish.dropped, '1min': num } } } };
    case 'load/publish/dropped/5min':  return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, dropped: { ...stats.load.publish.dropped, '5min': num } } } };
    case 'load/publish/dropped/15min': return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, dropped: { ...stats.load.publish.dropped, '15min': num } } } };

    case 'load/publish/received/1min':  return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, received: { ...stats.load.publish.received, '1min': num } } } };
    case 'load/publish/received/5min':  return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, received: { ...stats.load.publish.received, '5min': num } } } };
    case 'load/publish/received/15min': return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, received: { ...stats.load.publish.received, '15min': num } } } };

    case 'load/publish/sent/1min':  return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, sent: { ...stats.load.publish.sent, '1min': num } } } };
    case 'load/publish/sent/5min':  return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, sent: { ...stats.load.publish.sent, '5min': num } } } };
    case 'load/publish/sent/15min': return { ...stats, load: { ...stats.load, publish: { ...stats.load.publish, sent: { ...stats.load.publish.sent, '15min': num } } } };

    case 'load/bytes/received/1min':  return { ...stats, load: { ...stats.load, bytes: { ...stats.load.bytes, received: { ...stats.load.bytes.received, '1min': num } } } };
    case 'load/bytes/received/5min':  return { ...stats, load: { ...stats.load, bytes: { ...stats.load.bytes, received: { ...stats.load.bytes.received, '5min': num } } } };
    case 'load/bytes/received/15min': return { ...stats, load: { ...stats.load, bytes: { ...stats.load.bytes, received: { ...stats.load.bytes.received, '15min': num } } } };

    case 'load/bytes/sent/1min':  return { ...stats, load: { ...stats.load, bytes: { ...stats.load.bytes, sent: { ...stats.load.bytes.sent, '1min': num } } } };
    case 'load/bytes/sent/5min':  return { ...stats, load: { ...stats.load, bytes: { ...stats.load.bytes, sent: { ...stats.load.bytes.sent, '5min': num } } } };
    case 'load/bytes/sent/15min': return { ...stats, load: { ...stats.load, bytes: { ...stats.load.bytes, sent: { ...stats.load.bytes.sent, '15min': num } } } };

    case 'load/sockets/1min':  return { ...stats, load: { ...stats.load, sockets: { ...stats.load.sockets, '1min': num } } };
    case 'load/sockets/5min':  return { ...stats, load: { ...stats.load, sockets: { ...stats.load.sockets, '5min': num } } };
    case 'load/sockets/15min': return { ...stats, load: { ...stats.load, sockets: { ...stats.load.sockets, '15min': num } } };

    case 'load/connections/1min':  return { ...stats, load: { ...stats.load, connections: { ...stats.load.connections, '1min': num } } };
    case 'load/connections/5min':  return { ...stats, load: { ...stats.load, connections: { ...stats.load.connections, '5min': num } } };
    case 'load/connections/15min': return { ...stats, load: { ...stats.load, connections: { ...stats.load.connections, '15min': num } } };

    default: return stats;
  }
}

function brockerMonitorService(): BrockerMonitorContextValue {
  const [stats, setStats] = useState<BrokerStats>(initialStats);
  const [timeSeries, setTimeSeries] = useState<TimeSeriesPoint[]>([]);

  const pendingLoad = useRef({ msgReceived: 0, msgSent: 0, bytesReceived: 0, bytesSent: 0 });
  const lastPointTs = useRef(0);

  const onMessage = useCallback((message: MQTTMessage) => {
    const value = hexToString(message.data);
    const { topic } = message;
    const num = parseFloat(value) || 0;

    setStats(prev => applyTopicToStats(prev, topic, value));

    if (topic === '$SYS/broker/load/messages/received/1min') pendingLoad.current.msgReceived = num;
    if (topic === '$SYS/broker/load/messages/sent/1min')     pendingLoad.current.msgSent = num;
    if (topic === '$SYS/broker/load/bytes/received/1min')    pendingLoad.current.bytesReceived = num;
    if (topic === '$SYS/broker/load/bytes/sent/1min')        pendingLoad.current.bytesSent = num;

    if (topic === '$SYS/broker/uptime') {
      const now = Date.now();
      if (now - lastPointTs.current < 5000) return;
      lastPointTs.current = now;
      const p = pendingLoad.current;
      setTimeSeries(prev => {
        const point: TimeSeriesPoint = {
          timestamp: now,
          time: formatTime(now),
          msgReceived: p.msgReceived,
          msgSent: p.msgSent,
          bytesReceived: p.bytesReceived,
          bytesSent: p.bytesSent,
        };
        const next = [...prev, point];
        return next.length > MAX_SERIES_POINTS ? next.slice(-MAX_SERIES_POINTS) : next;
      });
    }
  }, []);

  useEffect(() => {
    const unsub = window.electron.systemMessage(onMessage);
    return unsub;
  }, [onMessage]);

  return { stats, timeSeries };
}

export default brockerMonitorService;
