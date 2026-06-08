import { EndpointField, StatusButton, ConnectionStatus } from '@/features/brockerConnection';
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  Stack
} from '@mui/material';

interface Prop {
  title: string;
}

export default function Header({title}: Prop) {
  return (
    <AppBar position='sticky' elevation={0}>
      <Toolbar variant='dense'>
        <Stack direction='row' alignItems='center' spacing={3}>
          <Typography variant='h6' color='inherit' component='div'>
            {title}
          </Typography>
          <ConnectionStatus/>
        </Stack>

        <Box sx={{ ml: 'auto', }}>
          <Stack direction='row' alignItems='center' spacing={1}>
            <EndpointField />
            <StatusButton/>
          </Stack>
        </Box>
      </Toolbar>
    </AppBar>
  );
}