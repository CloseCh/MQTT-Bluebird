import { Box } from '@mui/material';
import { SERIES_COLORS } from '@/theme';
import { useBrockerMonitorContext } from '../../hooks/useBrockerMonitorContext';
import { formatBytes } from '../../utils/format.util';
import ChartPanel from './ChartPanel/ChartPanel';

export function LoadChart() {
  const { timeSeries } = useBrockerMonitorContext();

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      <ChartPanel
        title='Message Rate (1min avg, msg/s)'
        data={timeSeries}
        lines={[
          { key: 'msgReceived', color: SERIES_COLORS.blue,   label: 'Received' },
          { key: 'msgSent',     color: SERIES_COLORS.orange, label: 'Sent' },
        ]}
      />
      <ChartPanel
        title='Bytes Rate (1min avg)'
        data={timeSeries}
        lines={[
          { key: 'bytesReceived', color: SERIES_COLORS.green, label: 'Received' },
          { key: 'bytesSent',     color: SERIES_COLORS.red,   label: 'Sent' },
        ]}
        yFormatter={formatBytes}
      />
    </Box>
  );
}
