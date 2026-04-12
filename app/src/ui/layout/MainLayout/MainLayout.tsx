import { Outlet } from 'react-router';

import {
  CssBaseline, 
  Stack
} from '@mui/material';

import { MQTTProvider } from '@/features/messageRepresentacion';
import Header from '../../components/Header/Header.jsx';
import { NavBar, NavigationProvider } from '@/features/navigation/index.js';

export default function MainLayout() {
  return (
    <>
      <CssBaseline />
      <MQTTProvider dataPointCount={100}>
      <NavigationProvider>
        <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
          <Header title='MQTTClient' />
          <Stack direction="row" sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
              <NavBar/>
            <Outlet />
          </Stack>
        </Stack>
      </NavigationProvider>
      </MQTTProvider>
    </>
  )
}