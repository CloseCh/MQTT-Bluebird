import { Box } from '@mui/material';
import { useBrockerMonitorContext } from '../../hooks/useBrockerMonitorContext';
import { formatBytes } from '../../util/format';
import ChartPanel from './ChartPanel/ChartPanel';

export function LoadChart() {
  const { timeSeries } = useBrockerMonitorContext();

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      <ChartPanel
        title='Message Rate (1min avg, msg/s)'
        data={timeSeries}
        lines={[
          { key: 'msgReceived', color: '#2196f3', label: 'Received' },
          { key: 'msgSent',     color: '#ff9800', label: 'Sent' },
        ]}
      />
      <ChartPanel
        title='Bytes Rate (1min avg)'
        data={timeSeries}
        lines={[
          { key: 'bytesReceived', color: '#4caf50', label: 'Received' },
          { key: 'bytesSent',     color: '#f44336', label: 'Sent' },
        ]}
        yFormatter={formatBytes}
      />
    </Box>
  );
}
