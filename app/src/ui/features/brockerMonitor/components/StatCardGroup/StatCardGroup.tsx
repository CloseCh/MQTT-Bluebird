import { Box, Stack } from '@mui/material';
import { useBrockerMonitorContext } from '../../hooks/useBrockerMonitorContext';
import StatCard from './StatCard/StatCard';
import { formatBytes, formatUptime } from '../../utils/format.util';

export function StatCardGroup() {
  const { stats } = useBrockerMonitorContext();
  const { clients, messages, bytes, heap, subscriptions, uptime, version } = stats;

  const heapPct = heap.maximum > 0
    ? `${Math.round((heap.current / heap.maximum) * 100)}% used`
    : undefined;

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      <Stack direction={'column'} spacing={2} sx={{flexShrink: 0}}>
        <Stack direction={'row'} spacing={2}>
          <StatCard label='Version' value={version || '—'} />
          <StatCard label='Uptime' value={uptime ? formatUptime(uptime) : '—'} />
        </Stack>
        <Stack direction={'row'} spacing={2}>
          <StatCard
            label='Clients'
            value={clients.connected}
            sub={`${clients.total} total / ${clients.maximum} max`}
          />
          <StatCard
            label='My subscriptions'
            value={subscriptions.count.toLocaleString()}
          />
          <StatCard
            label='Messages Recv'
            value={messages.received.toLocaleString()}
            sub={`${messages.sent.toLocaleString()} sent`}
          />
          <StatCard
            label='Bytes Recv'
            value={formatBytes(bytes.received)}
            sub={`${formatBytes(bytes.sent)} sent`}
          />
          <StatCard
            label='Heap'
            value={formatBytes(heap.current)}
            sub={heapPct}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
