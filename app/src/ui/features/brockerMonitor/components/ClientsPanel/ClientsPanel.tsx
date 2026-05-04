import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { useBrockerMonitorContext } from '../../hooks/useBrockerMonitorContext';

export function ClientsPanel() {
  const theme = useTheme();
  const { stats } = useBrockerMonitorContext();
  const { clients, publish, store, retainedMessages } = stats;

  const tickStyle = { fontSize: 10, fill: theme.palette.text.secondary };
  const tooltipStyle = {
    contentStyle: {
      backgroundColor: theme.palette.background.paper,
      border: `1px solid ${theme.palette.divider}`,
      borderRadius: 6,
      color: theme.palette.text.primary,
    },
    labelStyle: { color: theme.palette.text.primary, fontWeight: 600 },
    itemStyle:  { color: theme.palette.text.secondary },
  };

  const clientData = [
    { name: 'Connected',    value: clients.connected,    fill: '#4caf50' },
    { name: 'Disconnected', value: clients.disconnected, fill: '#f44336' },
    { name: 'Inactive',     value: clients.inactive,     fill: '#ff9800' },
    { name: 'Expired',      value: clients.expired,      fill: '#9e9e9e' },
  ];

  const publishData = [
    { name: 'Received', value: publish.messages.received, fill: '#2196f3' },
    { name: 'Sent',     value: publish.messages.sent,     fill: '#4caf50' },
    { name: 'Dropped',  value: publish.messages.dropped,  fill: '#f44336' },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      <Paper sx={{ p: 2, flex: 1, minWidth: 220 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Client Status
        </Typography>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={clientData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="name" tick={tickStyle} />
            <YAxis tick={tickStyle} width={35} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="value" name="Clients" radius={[3, 3, 0, 0]} fill="fill" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, flex: 1, minWidth: 220 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={1}>
          Publish Messages
        </Typography>
        <ResponsiveContainer width="100%" height={160}>
          <BarChart data={publishData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="name" tick={tickStyle} />
            <YAxis tick={tickStyle} width={40} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey="value" name="Messages" radius={[3, 3, 0, 0]} fill="fill" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, minWidth: 160 }}>
        <Typography variant="subtitle2" color="text.secondary" mb={1.5}>
          Storage
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          {[
            { label: 'Stored messages',  value: stats.messages.stored },
            { label: 'Store msg count',  value: store.messages.count },
            { label: 'Retained msgs',    value: retainedMessages.count },
            { label: 'Subscriptions',    value: stats.subscriptions.count },
            { label: 'Shared subs',      value: stats.sharedSubscriptions.count },
          ].map(row => (
            <Box key={row.label} sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
              <Typography variant="caption" color="text.secondary">{row.label}</Typography>
              <Typography variant="caption" fontWeight="bold">{row.value.toLocaleString()}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
