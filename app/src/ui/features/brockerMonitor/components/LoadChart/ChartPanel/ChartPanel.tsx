import type { TimeSeriesPoint } from "@/features/brockerMonitor";
import { Box, Paper, Typography, useTheme } from "@mui/material";
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface ChartPanelProps {
  title: string;
  data: TimeSeriesPoint[];
  lines: { key: keyof TimeSeriesPoint; color: string; label: string }[];
  yFormatter?: (val: number) => string;
}

export default function ChartPanel({ title, data, lines, yFormatter }: ChartPanelProps) {
  const theme = useTheme();
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

  return (
    <Paper sx={{ p: 2, flex: 1, minWidth: 0 }}>
      <Typography variant="subtitle2" color="text.secondary" mb={1}>
        {title}
      </Typography>
      {data.length === 0 ? (
        <Box sx={{ height: 180, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Typography variant="caption" color="text.disabled">
            Waiting for data...
          </Typography>
        </Box>
      ) : (
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
            <XAxis dataKey="time" tick={tickStyle} interval="preserveStartEnd" />
            <YAxis
              tick={tickStyle}
              tickFormatter={yFormatter}
              width={yFormatter ? 60 : 40}
            />
            <Tooltip
              {...tooltipStyle}
              formatter={(val, name) => {
                const n = typeof val === 'number' ? val : 0;
                return [yFormatter ? yFormatter(n) : n.toFixed(2), name];
              }}
            />
            <Legend iconSize={10} wrapperStyle={{ fontSize: 11, color: theme.palette.text.secondary }} />
            {lines.map(l => (
              <Line
                key={l.key as string}
                type="monotone"
                dataKey={l.key as string}
                stroke={l.color}
                name={l.label}
                dot={false}
                strokeWidth={2}
                isAnimationActive={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
}