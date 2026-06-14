import { Box, Paper, Typography, useTheme } from '@mui/material';
import {
  BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';
import { SERIES_COLORS } from '@/theme';
import { useBrockerMonitorContext } from '../../hooks/useBrockerMonitorContext';
import { CLIENT_COLORS } from '../../constants/brockerMonitor.constants';

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
    { name: 'Connected',    value: clients.connected,    fill: CLIENT_COLORS.Connected },
    { name: 'Disconnected', value: clients.disconnected, fill: CLIENT_COLORS.Disconnected },
    { name: 'Inactive',     value: clients.inactive,     fill: CLIENT_COLORS.Inactive },
    { name: 'Expired',      value: clients.expired,      fill: CLIENT_COLORS.Expired },
  ];

  const publishData = [
    { name: 'Received', value: publish.messages.received, fill: SERIES_COLORS.blue },
    { name: 'Sent',     value: publish.messages.sent,     fill: SERIES_COLORS.green },
    { name: 'Dropped',  value: publish.messages.dropped,  fill: SERIES_COLORS.red },
  ];

  return (
    <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
      <Paper sx={{ p: 2, flex: 1, minWidth: 220 }}>
        <Typography variant='subtitle2' color='text.secondary' mb={1}>
          Client Status
        </Typography>
        <ResponsiveContainer width='100%' height={160}>
          <BarChart data={clientData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' stroke={theme.palette.divider} />
            <XAxis dataKey='name' tick={tickStyle} />
            <YAxis tick={tickStyle} width={35} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey='value' name='Clients' radius={[3, 3, 0, 0]}>
              {clientData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, flex: 1, minWidth: 220 }}>
        <Typography variant='subtitle2' color='text.secondary' mb={1}>
          Publish Messages
        </Typography>
        <ResponsiveContainer width='100%' height={160}>
          <BarChart data={publishData} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray='3 3' stroke={theme.palette.divider} />
            <XAxis dataKey='name' tick={tickStyle} />
            <YAxis tick={tickStyle} width={40} />
            <Tooltip {...tooltipStyle} />
            <Bar dataKey='value' name='Messages' radius={[3, 3, 0, 0]}>
              {publishData.map((entry) => (
                <Cell key={entry.name} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Paper>

      <Paper sx={{ p: 2, minWidth: 160 }}>
        <Typography variant='subtitle2' color='text.secondary' mb={1.5}>
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
              <Typography variant='caption' color='text.secondary'>{row.label}</Typography>
              <Typography variant='caption' fontWeight='bold'>{row.value.toLocaleString()}</Typography>
            </Box>
          ))}
        </Box>
      </Paper>
    </Box>
  );
}
