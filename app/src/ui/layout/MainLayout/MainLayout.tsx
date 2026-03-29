import { Outlet } from 'react-router';

import {
  CssBaseline, 
  Stack
} from '@mui/material';

import { MQTTProvider } from '@/features/messageRepresentacion';
import NavBar from '../../components/NavBar/NavBar.jsx';
import Header from '../../components/Header/Header.jsx';

export default function MainLayout() {
  return (
    <>
      <CssBaseline />
      <MQTTProvider dataPointCount={100}>
        <Stack sx={{ height: '100vh', overflow: 'hidden' }}>
          <Header title='MQTTClient' />
          <Stack direction="row" sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>
            <NavBar />
            <Outlet />
          </Stack>
        </Stack>
      </MQTTProvider>
    </>
  )
}