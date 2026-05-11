import { 
  Paper, 
  Typography 
} from '@mui/material';

interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
}

export default function StatCard({ label, value, sub }: StatCardProps) {
  return (
    <Paper sx={{ p: 2, minWidth: 120, flexShrink: 0 }}>
      <Typography variant='caption' color='text.secondary' display='block'>
        {label}
      </Typography>
      <Typography variant='h6' fontWeight='bold' lineHeight={1.2}>
        {value}
      </Typography>
      {sub && (
        <Typography variant='caption' color='text.secondary' display='block' mt={0.5}>
          {sub}
        </Typography>
      )}
    </Paper>
  );
}