import { Box, Typography } from '@mui/material';
import { StatCardGroup, LoadChart, ClientsPanel } from '@features/brockerMonitor/';

export function BrokerMonitorPage() {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      <Typography variant='h6' fontWeight='bold'>
        Broker Monitor
      </Typography>
      <StatCardGroup />
      <LoadChart />
      <ClientsPanel />
    </Box>
  );
}
