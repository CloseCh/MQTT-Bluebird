import StatusButton from '@/features/brockerConnection/component/StatusButton/StatusButton';
import {
  Box,
  Typography,
  AppBar,
  Toolbar
} from '@mui/material';

interface Prop {
  title: string;
}

export default function Header({title}: Prop) {
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar variant='dense'>
        <Typography variant='h6' color='inherit' component='div'>
          {title}
        </Typography>
        <Box sx={{ ml: 'auto' }}>
          <StatusButton/>
        </Box>
      </Toolbar>
    </AppBar>
  );
}